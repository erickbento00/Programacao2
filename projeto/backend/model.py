from config import *

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    animal_type = db.Column(db.String(254))
    code = db.Column(db.String(254))
    medicine = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+") "+ self.animal_type + ", " +\
            self.code + ", " + self.medicine


    def json(self):
        return {
            "id": self.id,
            "animal_type": self.animal_type,
            "code": self.code,
            "medicine": self.medicine
        }

if __name__ == "__main__":
    if path.exists(db_file):
        remove(db_file)

    db.create_all()

    a1 = Animal(animal_type = "Cachorro", code = "001", 
        medicine = "Anti_pugas")
    a2 = Animal(animal_type = "Gato", code = "002", 
        medicine = "Amoxicilina")
    a3 = Animal(animal_type = "cavalo", code = "003", 
        medicine = "NGF-5")
    a4 = Animal(animal_type = "Tartaruga", code = "004", 
        medicine = "Ivermectina")
    a5 = Animal(animal_type = "Coelho", code = "005", 
        medicine = "Clorexidine")

    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)
    db.session.add(a4)
    db.session.add(a5)
    db.session.commit()

    print(a2)
    print(a2.json())