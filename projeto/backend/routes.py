from config import *
from model import Animal


@app.route("/")
def main():
    return "Se liga no meu veterinario" +\
        '<a href="/index_veterinario"> Olha os animais cadastrados aqui</a>'

@app.route("/index_veterinario")
def index_veterinario():
    animals = db.session.query(Animal).all()
    json_animals = [ animal.json() for animal in animals ]
    response = jsonify(json_animals)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response