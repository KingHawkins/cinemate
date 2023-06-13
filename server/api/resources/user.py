from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_smorest import Blueprint
from database.models.user import User
from database.database import db, redis_client, mail, app
from flask.views import MethodView
from flask_mail import Message
from server.schemas import RegisterView, AuthorizationHeaderSchema, PasswordView, LoginView
from flask import jsonify, request, current_app, render_template
import bcrypt
import os
import requests
import json
import datetime


user_view = Blueprint("users", __name__, description='Operations on movies')


def send_email(**kwargs):
    template = render_template("register.html", username=kwargs['username'])
    msg = Message("Successfully signed up to Cinemate", recipients=[kwargs['email']], html=template)

    mail.send(msg)

def process(**kwargs):
    with app.app_context():
        send_email(**kwargs)


@user_view.route("/register", strict_slashes=False)
class Register(MethodView):
    @user_view.arguments(RegisterView)
    def post(self, data):
        data = request.json
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        contact = data.get("contact")

        existing_user = db.session.query(User).filter(db.or_(
            User.username == username,
            User.email == email)).first()
        if existing_user is not None:
            return jsonify(message="username or email exists"), 409

        new_user = User(username=username, email=email, password=password, contact=contact)
        db.session.add(new_user)
        db.session.commit()

        current_app.queue.enqueue(process, username=new_user.username, email=new_user.email)

        return jsonify({'message':'user registered successfully'}), 200
              

@user_view.route("/login", strict_slashes=False)
class Login(MethodView):
    @user_view.arguments(LoginView)
    def post(self, data):
        username = request.json.get("username")
        password = request.json.get("password")
        user = db.session.query(User).filter(User.username == username).first()
        print(user.password)
        if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
            access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(minutes=60))
            return jsonify(access_token=access_token), 200
        return jsonify(message="Invalid username or password"), 401


@user_view.route("/signout", strict_slashes=False)
class Signout(MethodView):
    @user_view.arguments(AuthorizationHeaderSchema)
    @jwt_required()
    def post(self, data):

        jti = get_jwt()["jti"]
        redis_client.set(jti, json.dumps({'blacklisted': True}))

        new_token = create_access_token(identity=get_jwt_identity(), expires_delta=datetime.timedelta(seconds=1))
        return jsonify(message="signed out succesfully"), 200

@user_view.route("/logout", strict_slashes=False)
class Logout(MethodView):
    @user_view.arguments(AuthorizationHeaderSchema)
    @jwt_required()
    def delete(self, data):
        auth_header = request.headers.get("Authorization")
        token = auth_header.replace("Bearer", "").strip()

        jti = get_jwt()["jti"]
        redis_client.set(jti, json.dumps({'blacklisted': True}))
        user_id = get_jwt_identity()
        user = db.session.query(User).filter(User.id == user_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
        else:
            return jsonify(message="User not found"), 404
        return jsonify(message="logged out succesfully"), 200

@user_view.route("/change_password", strict_slashes=False)
class Password(MethodView):
    @user_view.arguments(PasswordView)
    @jwt_required()
    def put(self, data):
        user_id = get_jwt_identity()
        user = db.session.query(User).filter(User.id == user_id).first()
        user.password = request.json.get("password")
        user.save()
        db.session.add(user)
        db.session.commit()
        return jsonify(message="password updated successfully"), 200

@user_view.route("/info", strict_slashes=False)
class Info(MethodView):
    @user_view.arguments(AuthorizationHeaderSchema)
    @jwt_required()
    def get(self, data):
        current_user_id = get_jwt_identity()
        user = db.session.query(User).filter(User.id == current_user_id).first()
        return jsonify(user.to_dict()), 200
