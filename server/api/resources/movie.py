from database.models.movie import Movie
from database.database import db
from flask import jsonify, request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from server.schemas import MoviePutSchema
from webargs.flaskparser import use_args

app_view = Blueprint("movies", __name__, description="Operations on movies")

@app_view.route("/movies/<movie_id>", strict_slashes=False)
class MovieView(MethodView):
    def get(self,  movie_id):
        movie = db.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie:
            return jsonify(movie.to_dict()), 200
        abort(404)
        
    @app_view.arguments(MoviePutSchema)
    def put(self, data, movie_id):
        movie = db.session.query(Movie).filter(Movie.id == movie_id).first()
        if movie:
            for key, value in request.json.items():
                setattr(movie, key, value)
            movie.save()
            db.session.add(movie)
            db.session.commit()
            return jsonify(status="OK")
        abort(404)


@app_view.route("/movies", methods=["GET"], strict_slashes=False)
def movies():
    movies = db.session.query(Movie).all()
    if movies:
       store = []
       for movie in movies:
           store.append(movie.to_dict())
       return jsonify(store), 200
    abort(404)


@app_view.route("/movies/display", methods=["GET"], strict_slashes=False)
def movies():
    movies = db.session.query(Movie).all()
    if movies:
       store = []
       for movie in movies:
           store.append(movie.to_dict())
       return jsonify(store[:5]), 200
    abort(404)
