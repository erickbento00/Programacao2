from config import *

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    animal_type = db.Column(db.String(254))
    code = db.Column(db.String(254))

    def __str__(self):
        return f"{self.id}, {self.animal_type}, " + \
            f"{self.code}"

    def json(self):
        return {
            "id": self.id,
            "animal_type": self.animal_type,
            "code": self.code
        }

class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(254))
    name_medicine = db.Column(db.String(254), nullable=False)
    producer = db.Column(db.String(254), nullable=False)

    def __str__(self):
       return f"{self.id}, {self.name_medicine}, " + \
            f"{self.producer}, {self.code}"

    def json(self):
        return {
            "id":self.id,
            "name_medicine":self.name_medicine,
            "producer":self.producer,
            "code":self.code
        }


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity_medicine = db.Column(db.String(254))
    description = db.Column(db.String(254))

    animal_id = db.Column(db.Integer, db.ForeignKey(Animal.id), nullable=False)
    animal = db.relationship("Animal")
    medicine_id = db.Column(db.Integer, db.ForeignKey(Medicine.id), nullable=False)
    medicine = db.relationship("Medicine")

    def __str__(self):
        return f"{self.quantity_medicine}, {self.description}, " + \
            f"{self.animal_id}, {self.animal}, {self.medicine_id}, {self.medicine}"

    def json(self):
        return {
            "id":self.id,
            "quantity_medicine":self.quantity_medicine,
            "description":self.description,
            "animal_id":self.animal_id,
            "animal":self.animal.json(),
            "medicine_id":self.medicine_id,
            "medicine":self.medicine.json()
        }

#teste
if __name__ == "__main__":
    if path.exists(db_file):
        remove(db_file)

    db.create_all()

    a1 = Animal(animal_type="Cachorro", code="001")
    db.session.add(a1)

    m1 = Medicine(code="123", name_medicine="Anti_pugas", producer="farmais")
    db.session.add(m1)

    r1 = Recipe(quantity_medicine="2", description="Ele sente muita coceira",
        animal=a1, medicine=m1)
    db.session.add(r1)

    db.session.commit()

    print(a1)
    print(a1.json())
    print("\n")
    print(m1)
    print(m1.json())
    print("\n")
    print(r1)
    print(r1.json())