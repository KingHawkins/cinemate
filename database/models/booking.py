from database.database import db
from database.models.base_model import BaseModel

class Booking(BaseModel, db.Model):
    """
    Tracks user bookings for specific showtimes. It includes the\
            references to the user and showtime tables, the number\
            of tickets booked, total booking amount and timestamps\
            for record creation and updates.
    """
    __tablename__ = "bookings"
    user_id = db.Column(db.String(128), db.ForeignKey("users.id"), nullable=False)
    showtime_id = db.Column(db.String(128) , db.ForeignKey("showtimes.id"), nullable=False)
    total_amount = db.Column(db.Float, default=0.0, nullable=False)
    num_tickets = db.Column(db.Integer, default=0, nullable=False)
