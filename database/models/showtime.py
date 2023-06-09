from database.database import db
from database.models.base_model import BaseModel
from datetime import datetime, time


class ShowTime(BaseModel, db.Model):
    """
    Represents specific showtimes for movies in theaters.
    It includes references to the movie and theater tables,
    show date, show time, and timestamps for record creation and updates.
    """
    __tablename__ = "showtimes"
    movie_id = db.Column(db.String(128), db.ForeignKey("movies.id"),  nullable=False)
    cinema = db.Column(db.String(60), default='cinemate cineplex', nullable=False)
    seats_available = db.Column(db.Integer, default=62, nullable=False)
    show_date = db.Column(db.DateTime, default=datetime(2023, 12, 6), nullable=False)
    show_time = db.Column(db.Time, default=time(16, 25), nullable=False)
