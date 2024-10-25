from django.apps import AppConfig


class BotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Bot'


# from django.apps import AppConfig

# class BotConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'Bot'

#     def ready(self):
#         from .bot import setup_bot
#         setup_bot()