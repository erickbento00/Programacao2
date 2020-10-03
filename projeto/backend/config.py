from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
from os import path, remove

app = Flask(__name__)
CORS(app)
file_path = path.dirname(path.abspath(__file__))
db_file = path.join(file_path, "veterinario.db")

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///"+db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(app)