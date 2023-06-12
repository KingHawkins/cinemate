from database.models.base_model import BaseModel
from database.database import db
from database.models.ticket import Ticket

class User(BaseModel, db.Model):
    """
    Stores user information such as username, email, hashed password and tickets.
    It also includes timestamps for record creation.
    """
    __tablename__ = "users"
    username = db.Column(db.String(60), unique=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    contact = db.Column(db.String(60), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    tickets = db.relationship("Ticket", backref="user", cascade="all, delete")
