from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_smorest import Blueprint
from database.models.ticket import Ticket
from database.models.user import User
from database.database import db, redis_client, mail, app
from flask.views import MethodView
from flask_mail import Message
from server.schemas import TicketView, TicketId
from flask import jsonify, request, current_app, render_template

ticket_view = Blueprint("tickets", __name__, description="Operations on Tickets")

@ticket_view.route('/tickets', strict_slashes=False)
class Tickets(MethodView):
    @jwt_required()
    @ticket_view.arguments(TicketView)
    def post(self, data):
        (id, movie_id) = (request.json.get('id'), request.json.get('movie_id'))
        (seat, price) = (request.json.get("seat"), request.json.get('price'))
        user_id = get_jwt_identity()
        ticket = Ticket(id=id, movie_id=movie_id, seat=seat, price=price, user_id=user_id)
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
        (user, l_tickets) = (db.session.query(User.id == user_id).first(), [])
        for ticket in user.tickets:
            l_tickets.append(ticket.to_dict())
        return jsonify(l_ticket), 200

@ticket_view.route('/tickets/<ticket_id>', strict_slashes=False)
class Tickett(MethodView):
    @jwt_required()
    @ticket_view.arguments(TicketId)
    def get(self, data, ticket_id):
        user = db.session.query(User).first()
        for ticket in user.tickets:
            if ticket.id == ticket_id:
                return jsonify(ticket.to_dict()), 200
        return jsonify(message="Ticket not found"), 404
