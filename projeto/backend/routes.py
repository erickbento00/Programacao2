from config import *
from model import Animal, Medicine, Recipe


@app.route("/")
def main():
    return "Se liga no meu veterinario" +\
        '<a href="/index_animals"> Olha os animais cadastrados aqui</a>'

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

@app.route("/index_medicines")
def index_medicines():
    medicines = db.session.query(Medicine).all()
    json_medicines = [ medicine.json() for medicine in medicines ]
    response = jsonify(json_medicines)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/index_recipes")
def index_recipes():
    recipes = db.session.query(Recipe).all()
    json_recipes = [ recipe.json() for recipe in recipes ]
    response = jsonify(json_recipes)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response