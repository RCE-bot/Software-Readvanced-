from dotenv import load_dotenv
import os

load_dotenv() #load environment file

class ApplicationConfig:
    """
    Config settings for app
    - session type for storage: store on local
    - prevent SQL nuking in terminal (echo = false)
    - url for db
    """
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False #prevent SQL message nuking in terminal (let this be True if you want to see sql code injection in the database through terminal 
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    SESSION_TYPE = "filesystem" #store as local
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True #session storage
