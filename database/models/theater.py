from database.database import db
from database.models.base_model import BaseModel


class Theater(BaseModel, db.Model):
    """
    Stores information about theaters or cinema halls.
    It includes details like theater name, address,
    seating capacity, and timestamps for record creation and updates.
    """
    __tablename__ = "theaters"
    name = db.Column(db.String(128), nullable=False)
    capacity = db.Column(db.Integer, default=0, nullable=False)
    address = db.Column(db.String(128), nullable=False)
