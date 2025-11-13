from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy() #db type

def get_uuid() -> str:
    return uuid4().hex #unique user id for each user

class User(db.Model):
    """
    construct the database Users table
    """
    __tablename__ = "users" #name
    #table fields, colums (converts to sql)
    id = db.Column(db.String(32),  #uuid string length
                   primary_key=True,
                   unique=True,
                   default=get_uuid
                   ) #uuid of each account

    username = db.Column(db.String(345),
                         unique=True) #username field
    password = db.Column(db.Text,
                         nullable=False) #password field
