from database.models.base_model import BaseModel
from database.database import db


class Ticket(BaseModel, db.Model):
    """
    Represents individual tickets booked for a specific showtime.
    Each ticket is associated with a booking and includes details such as\
            the seat number.
    The timestatmps for record creation and updates are also included.
    """
    __tablename__ = "tickets"
    seat_number = db.Column(db.String(60), nullable=False)
    booking_id = db.Column(db.String(60), db.ForeignKey("bookings.id"), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
