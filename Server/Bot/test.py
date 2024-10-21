import requests
import os
from dotenv import load_dotenv
from django.conf import settings




# Load environment variables from .env file
load_dotenv()

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
print(TELEGRAM_BOT_TOKEN)

url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getMe"
response = requests.get(url)
print(response.json())


