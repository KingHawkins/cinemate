from database.database import db
from database.models.base_model import BaseModel


class Movie(BaseModel, db.Model):
    """
    Represents the movies available in the system.
    It includes details like movie title, description, release_date, duration,
    and timestamps for record creation and updates.
    """
    __tablename__ = "movies"
    title = db.Column(db.String(128), nullable=False)
    genre = db.Column(db.String(128), default="Thriller", nullable=False)
    trailer_url = db.Column(db.String(128), nullable=False)
    poster_url = db.Column(db.String(128), nullable=False)
    duration = db.Column(db.String(10), nullable=False)
    overview = db.Column(db.String(1000), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
