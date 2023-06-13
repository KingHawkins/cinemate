from database.database import db, redis_client, mail, app
from database.models.user import User
from database.models.movie import Movie
from database.models.ticket import Ticket
from database.models.showtime import ShowTime
from database.models.booking import Booking
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_smorest import Api
from flask_migrate import Migrate
from flask_mail import Mail, Message
from flask_jwt_extended import JWTManager
from datetime import datetime
from server.api.resources.movie import app_view
from server.api.resources.user import user_view
from server.api.resources.ticket import ticket_view
from redis import Redis
from rq import Queue
import os
import psycopg2
import requests

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = ('sqlite:///' +
                                         os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                         'database.db'))
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://xyreiqbm:dDih5M4WiGDy5JLHRV-FTwrDY8FLabu9@tyke.db.elephantsql.com/xyreiqbm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['API_TITLE'] = "Cinemate REST API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/api"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config['JWT_SECRET_KEY'] = os.urandom(24)
app.config["REDIS_HOST"] = "localhost"
app.config["REDIS_PORT"] = 6379
app.config['TEMPLATES_AUTO_RELOAD'] = True
template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app.template_folder = template_dir

db.init_app(app)
migrate = Migrate(app, db)
mail.init_app(app)
redis_client = Redis(host=app.config['REDIS_HOST'], port=app.config['REDIS_PORT'])
app.queue = Queue("emails", connection=redis_client)
CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

api.register_blueprint(app_view, url_prefix="/api")
api.register_blueprint(ticket_view, url_prefix="/api")
api.register_blueprint(user_view, url_prefix="/api")
migrate = Migrate(app, db)

jwt = JWTManager(app)
load_dotenv()


def store_movies():
    api = os.getenv("API_KEY")
    (params, collection) = ({ "page": 2 }, [])
    response = requests.get(f"https://api.themoviedb.org/3/movie/popular?api_key={api}", params=params)
    for movie in response.json().get('results'):
        poster_url = 'https://image.tmdb.org/t/p/original' + movie.get('poster_path')
        movie_id = movie.get('id')
        url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key={api}"
        for video in requests.get(url).json().get('results', []):
            if video.get("type") == "Trailer":
                collection.append(video.get("key"))
        video_url = f"https://www.youtube.com/embed/{collection[-1]}"
        release_date = movie.get("release_date")
        overview = movie.get("overview")
        (title, release_date) = (movie.get("title"), datetime.strptime(release_date, '%Y-%m-%d').date())
        mov = Movie(title=title, overview=overview, poster_url=poster_url, trailer_url=video_url,
                release_date=release_date, duration="2:00:00")
        db.session.add(mov)
        db.session.commit()


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in redis_client

@jwt.expired_token_loader
def expired_token(jwt_header, jwt_payload):
    return jsonify(message="The token is expired"), 401

@jwt.revoked_token_loader
def revoked_token(jwt_header, jwt_payload):
    return jsonify(description="The token has been revoked", error="Token revoked"), 401

@app.teardown_appcontext
def close(exception):
    db.session.close()


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
