from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import CommandHandler, ContextTypes, Application, ApplicationBuilder
import os
import logging

# Setup logging for better monitoring of the bot
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)

# Ensure required environment variables are present
TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
WEBHOOK_URL = f"https://russian-roulette-game.onrender.com/webhook/{TELEGRAM_TOKEN}"
PORT = int(os.getenv("PORT", 8443))

if not TELEGRAM_TOKEN:
    raise ValueError("TELEGRAM_BOT_TOKEN is not set in environment variables.")

# Initialize application with the bot token
application = ApplicationBuilder().token(TELEGRAM_TOKEN).build()

# Define the /start command handler
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        web_app = WebAppInfo(url="https://russian-roullette-4taj.vercel.app/")
        await update.message.reply_text(
            "Welcome! Click the button below to open Breevs.",
            reply_markup=InlineKeyboardMarkup.from_button(
                InlineKeyboardButton(text="Open Breevs", web_app=web_app)
            )
        )
    except Exception as e:
        logging.error(f"Error in /start handler: {e}")
        await update.message.reply_text("Something went wrong. Please try again later.")

# Add the command handler to the application
application.add_handler(CommandHandler("start", start))

# Run the bot with webhook configuration


def main():
    try:
        logging.info("Starting bot with webhook...")
        application.run_webhook(
            listen="0.0.0.0",
            port=PORT,
            url_path=TELEGRAM_TOKEN,  # This secures the webhook endpoint
            webhook_url=WEBHOOK_URL
        )
    except Exception as e:
        logging.error(f"Error while running webhook: {e}")
        raise

if __name__ == "__main__":
    main()





