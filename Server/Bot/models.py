from django.db import models
from django.contrib.auth.models import AbstractUser

class TelegramUser(AbstractUser):
    telegram_id = models.CharField(max_length=255, unique=True)
    telegram_username = models.CharField(max_length=255, unique=True, null=True, blank=True) 
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)
    auth_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.telegram_id})"

    class Meta:
        verbose_name = 'Telegram User'
        verbose_name_plural = 'Telegram Users'


class Player(models.Model):
    user = models.ForeignKey(TelegramUser, on_delete=models.CASCADE, null=True)
    wallet_connected = models.BooleanField(default=False)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.user.telegram_username 


class GameSession(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    result = models.IntegerField()

    def __str__(self):
        return f"Game for {self.player.user.telegram_username} at {self.timestamp}"
