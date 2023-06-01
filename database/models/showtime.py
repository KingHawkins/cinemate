from database.database import db
from database.models.base_model import BaseModel


class ShowTime(BaseModel, db.Model):
    """
    Represents specific showtimes for movies in theaters.
    It includes references to the movie and theater tables,
    show date, show time, and timestamps for record creation and updates.
    """
    __tablename__ = "showtimes"
    movie_id = db.Column(db.String(128), db.ForeignKey("movies.id"),  nullable=False)
    theater_id = db.Column(db.String(128), db.ForeignKey("theaters.id"), nullable=False)
    show_date = db.Column(db.DateTime, nullable=False)
    show_time = db.Column(db.Time, nullable=False)
