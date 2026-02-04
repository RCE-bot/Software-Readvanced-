import sqlite3
from uuid import uuid4

DB_PATH = "./db.sqlite"

def get_uuid() -> str:
    return uuid4().hex

def get_db_connection():
    # Connects to the SQLite file and returns rows as dictionaries
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    # Replaces db.create_all()
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username VARCHAR(345) UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()