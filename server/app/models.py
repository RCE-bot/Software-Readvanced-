import os
import sqlite3
from datetime import timedelta
import secrets

class Models(object):
    """
    Defines the schema and database interaction logic using raw SQLite.
    This class handles connection setup and table initialization.

    -- should be called in __init__ method
    """
    def __init__(self, app=None):
        self.app = app
        self.init_db()  # when imported from package __init__
        if app is not None:
            #if app is defined
            print("initializing db: SUCCESS!")
            # Secret key is used to sign session data (must be kept secret in real apps!)
            secret = os.environ.get("SECRET_KEY")
            if not secret:
                secret = secrets.token_urlsafe(64)
            self.app.secret_key = secret
            # Permanent sessions last for 7 days (used when "Remember Me" is checked)
            self.app.permanent_session_lifetime = timedelta(days=7)
        else:
            #error __init__ not give app attribute to models
            print("could not init db FAILED! at models.py")
            raise RuntimeError("Flask app not provided to Models class.")

    # Helper function to connect to SQLite database
    def get_db_connection(self):
        # Connect to SQLite database (creates file users.db if it doesn’t exist)
        conn = sqlite3.connect("users.db")
        conn.row_factory = sqlite3.Row  # Makes rows behave like dictionaries
        return conn

    # Initialize database with a "users" table
    def init_db(self):
        conn = self.get_db_connection()
        conn.execute("""
CREATE TABLE IF NOT EXISTS users -- init database (create tables with fields) 
(
            id INTEGER PRIMARY KEY AUTOINCREMENT, -- Auto-increment ID
            username TEXT UNIQUE NOT NULL,        -- Unique username
            password TEXT NOT NULL                -- Password (plain text for demo, should use hashing!)
)                     
""")
        conn.commit()
        conn.close()