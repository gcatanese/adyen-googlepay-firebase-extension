import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


def get_port():
    return os.environ.get("PORT", 5001)

