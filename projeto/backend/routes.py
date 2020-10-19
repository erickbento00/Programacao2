from config import *
from model import Animal


@app.route("/")
def main():
    return "Se liga no meu veterinario" +\
        '<a href="/index_veterinario"> Olha os animais cadastrados aqui</a>'

@app.route("/index_animals")
def index_animals():
    animals = db.session.query(Animal).all()
    json_animals = [ animal.json() for animal in animals ]
    response = jsonify(json_animals)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/create_animal", methods=["POST"])
def create_animal():
    response = jsonify({ "result": "ok", "details": "ok" })
    data = request.get_json()

    try:
        new_animal = Animal(**data)
        db.session.add(new_animal)
        db.session.commit()
    except Exception as e:
        response = jsonify({ "result": "error", "details": str(e) })

    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/delete_animal/<int:animal_id>", methods=['DELETE'])
def delete_animal(animal_id):
    response = jsonify({"result": "ok", "details": "ok"})
    try:
        Animal.query.filter(Animal.id == animal_id).delete()
        db.session.commit()
    except Exception as e:
        response = jsonify({"result":"error", "details": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response