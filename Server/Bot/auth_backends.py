# authentication.py
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.utils import timezone
import hashlib
import hmac
import os

User = get_user_model()

class TelegramAuthBackend(BaseBackend):
    def authenticate(self, request, telegram_data=None):
        if telegram_data is None:
            return None

        bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        if not bot_token:
            raise ValueError("TELEGRAM_BOT_TOKEN is not set in the environment")
        
        data_check_string = '\n'.join(f'{k}={v}' for k, v in sorted(telegram_data.items()) if k != 'hash')
        secret_key = hashlib.sha256(bot_token.encode()).digest()
        hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        if hash != telegram_data['hash']:
            return None

        # Check if the auth_date is not older than a day
        auth_date = int(telegram_data['auth_date'])
        if timezone.now().timestamp() - auth_date > 86400:
            return None

        # Get or create the user
        user, created = User.objects.get_or_create(
            telegram_id=telegram_data['id'],
            defaults={
                'telegram_username': telegram_data.get('username', ''),
                'first_name': telegram_data.get('first_name', ''),
                'last_name': telegram_data.get('last_name', ''),
                'photo_url': telegram_data.get('photo_url', ''),
                'auth_date': timezone.now(),
            }
        )

        if not created:
            # Update user information
            user.telegram_username = telegram_data.get('username', '')
            user.first_name = telegram_data.get('first_name', '')
            user.last_name = telegram_data.get('last_name', '')
            user.photo_url = telegram_data.get('photo_url', '')
            user.auth_date = timezone.now()
            user.save()

        return user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None