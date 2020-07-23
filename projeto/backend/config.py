from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import json
from os import path, remove

app = Flask(__name__)
file_path = path.dirname(path.abspath(__file__))
db_file = path.join(file_path, "veterinario.db")

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(app)