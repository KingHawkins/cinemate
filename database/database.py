from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from redis import Redis
from flask import Flask

redis_client = Redis()
app = Flask(__name__, template_folder='../server/templates')
app.config["MAIL_SERVER"] = 'smtp.gmail.com'
app.config["MAIL_PORT"] = 587
app.config["MAIL_USERNAME"] = "bobhawkins474@gmail.com"
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False
app.config["MAIL_PASSWORD"] = 'ynmmyonwaezknfkp'
app.config["MAIL_DEFAULT_SENDER"] = ("Cinemate", "bobhawkins474@gmail.com")
mail = Mail(app)
db = SQLAlchemy()
