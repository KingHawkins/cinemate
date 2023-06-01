from database.models.movie import Movie
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from server.app import app, db
import unittest
from fabric.api import *
from unittest.mock import patch


class TestMovie(unittest.TestCase):
    """
    Checks if there is movie stored in db.
    """
    def setUp(self):
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_check_if_movies_in_db(self):
        movie = db.session.query(Movie).all()
        self.assertEqual(len(movie), 60)

    def test_movies_endpoint_get(self):
        code = local("""curl -w '%{http_code}' -o /dev/null -s\
                     http://127.0.0.1:5000/api/movies""",
                     capture=True)
        self.assertEqual(int(code.strip()), 200)

    def test_movies_endpoint_get_movie_by_id_existing(self):
        code = local("""curl -w '%{http_code}' -o /dev/null -s\
                     http://127.0.0.1:5000/api/movies/aa13ffdd-7998-437a-9815-8a416a07400e""",
                     capture=True)
        self.assertEqual(int(code.strip()), 200)

    def test_movies_endpoint_get_movie_by_id_not_existing(self):
        code = local("""curl -w '%{http_code}' -o /dev/null -s\
                     http://127.0.0.1:5000/api/movies/1""",
                     capture=True)
        self.assertEqual(int(code.strip()), 404)



if __name__ == "__main__":
    unittest.main()
