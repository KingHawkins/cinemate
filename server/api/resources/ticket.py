from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_smorest import Blueprint
from database.models.ticket import Ticket
from database.models.movie import Movie
from database.models.user import User
from database.database import db, redis_client, mail, app
from datetime import date
from flask.views import MethodView
from flask_mail import Message
from server.schemas import TicketView, TicketId
from flask import jsonify, request, current_app, render_template
import base64
import io
import os
import qrcode

ticket_view = Blueprint("tickets", __name__, description="Operations on Tickets")

def send_email(**kwargs):
    template = render_template("testing.html", ticket=kwargs['ticket'], qrcode=kwargs['qrco'], created=kwargs['created'])
    msg = Message("Ticket booking successful", recipients=[kwargs['email']], html=template)

    mail.send(msg)

def process(**kwargs):
    with app.app_context():
        send_email(**kwargs)

@ticket_view.route('/tickets', strict_slashes=False)
class Tickets(MethodView):
    @jwt_required()
    @ticket_view.arguments(TicketView)
    def post(self, data):
        (id, movie) = (request.json.get('id'), request.json.get('movie'))
        (seat, price) = (request.json.get("seat_number"), request.json.get('price'))
        (user_id, booking_id) = (get_jwt_identity(), request.json.get('booking_id'))
        cinema = request.json.get('cinema')
        ticket = Ticket(id=id, movie=movie, seat_number=seat, cinema=cinema, booking_id=booking_id, price=price, user_id=user_id)
        user = db.session.query(User).filter(User.id == user_id).first()
        user.tickets.append(ticket)
        user.save()
        db.session.add(ticket)
        db.session.add(user)
        db.session.commit()

        return jsonify(message="Ticket created successfully"), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        (user, l_tickets) = (db.session.query(User).filter(User.id == user_id).first(), [])
        for ticket in user.tickets:
            l_tickets.append(ticket.to_dict())
        return jsonify(l_tickets), 200

@ticket_view.route('/email', strict_slashes=False)
class Email(MethodView):
    @jwt_required()
    def post(self):
        user = db.session.query(User).filter(User.id == get_jwt_identity()).first()
        movie = db.session.query(Movie).filter(Movie.id == request.json.get('id')).first()
        ticket = {
                'id': movie.id,
                'movie': movie.title,
                'cinema': request.json.get('cinema'),
                'booking_id': request.json.get('booking_id'),
                'price': request.json.get('price'),
                'seat_number': request.json.get('seat_number')
        }
        (created, string) = (str(date.today()), "data:image/png;base64,")
        qr = qrcode.QRCode(version=1, box_size=22, border=5)
        qr.add_data(ticket)
        qr.make(fit=True)
        qr_img = qr.make_image(format='svg')

        img_bytes = io.BytesIO()
        qr_img.save(img_bytes, format='PNG')
        img_bytes.seek(0)

        # Convert the image bytes to base64
        img_base64 = base64.b64encode(img_bytes.read()).decode('ascii')

        ticket['release_date'] = str(movie.release_date)

        current_app.queue.enqueue(process, ticket=ticket, email=user.email, created=created, qrco=string+img_base64)
        return jsonify('Ticket successfully booked'), 200

@ticket_view.route('/tickets/<ticket_id>', strict_slashes=False)
class Tickett(MethodView):
    @jwt_required()
    def get(self,  ticket_id):
        user_id = get_jwt_identity()
        ticket = db.session.query(Ticket).filter(Ticket.id == ticket_id).first()
        if ticket is not None:
            return jsonify(ticket.to_dict()), 200
        return jsonify(message="Ticket not found"), 404
