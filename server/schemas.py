from marshmallow import Schema, fields


class MoviePutSchema(Schema):
    id = fields.Str(dump_only=True)
    genre = fields.Str(required=True)

class RegisterView(Schema):
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    contact = fields.Str(required=True)

class AuthorizationHeaderSchema(Schema):
    authorization = fields.Str(load_from="Authorization")

class LoginView(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)

class PasswordView(Schema):
    password = fields.Str(required=True)

class TicketView(Schema):
    id = fields.Str(required=True)
    movie = fields.Str(required=True)
    seat_number = fields.Str(required=True)
    price = fields.Float(required=True)
    booking_id = fields.Str(required=True)
    cinema = fields.Str()

class TicketId(Schema):
    id = fields.Str(required=True)
