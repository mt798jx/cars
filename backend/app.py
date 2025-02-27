from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ----------------------
# Pripojenie na DB
# ----------------------
db_config = {
    'host': '34.107.119.159',
    'database': 'moja_databaza',
    'user': 'mirkos',
    'password': 'Macbook16',
    'port': 5432
}


def get_db_connection():
    connection = psycopg2.connect(**db_config)
    return connection


# ----------------------
# Pomocná funkcia na čítanie záznamov
# ----------------------
def fetch_auta(search=None, sort_by=None, sort_order=None):
    """
    search: string (vyhľadávací reťazec)
    sort_by: string (názov stĺpca napr. 'znacka', 'model', 'cena' atď.)
    sort_order: string ('asc' alebo 'desc')
    """
    connection = get_db_connection()
    cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    base_query = "SELECT * FROM auta"
    params = []

    # Vyhľadávanie - príklad vyhľadávania v stĺpcoch znacka a model
    if search:
        base_query += " WHERE znacka ILIKE %s OR model ILIKE %s"
        params.append(f"%{search}%")
        params.append(f"%{search}%")

    # Zoradenie
    allowed_sort_columns = ["id", "znacka", "model", "rok_vyroby", "palivo", "cena"]
    if sort_by in allowed_sort_columns:
        order = "ASC"
        if sort_order and sort_order.lower() == "desc":
            order = "DESC"
        base_query += f" ORDER BY {sort_by} {order}"

    cursor.execute(base_query, tuple(params))
    records = cursor.fetchall()

    cursor.close()
    connection.close()
    return records


# ----------------------
# Routen pre CRUD operácie
# ----------------------

# 1. Zoznam áut s možnosťou vyhľadávania a triedenia
@app.route('/auta', methods=['GET'])
def get_auta():
    search = request.args.get('search', default=None)
    sort_by = request.args.get('sortBy', default=None)
    sort_order = request.args.get('sortOrder', default=None)
    result = fetch_auta(search, sort_by, sort_order)
    return jsonify(result), 200


# 2. Pridanie nového auta
@app.route('/auta', methods=['POST'])
def create_auto():
    data = request.json
    znacka = data.get('znacka')
    model = data.get('model')
    rok_vyroby = data.get('rok_vyroby')
    palivo = data.get('palivo')
    cena = data.get('cena')
    dostupne = data.get('dostupne', True)

    # Vloženie záznamu
    conn = get_db_connection()
    cursor = conn.cursor()
    insert_query = """
        INSERT INTO auta (znacka, model, rok_vyroby, palivo, cena, dostupne)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING *;
    """
    cursor.execute(insert_query, (znacka, model, rok_vyroby, palivo, cena, dostupne))
    new_auto = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify(new_auto), 201


# 3. Úprava existujúceho auta
@app.route('/auta/<int:auto_id>', methods=['PUT'])
def update_auto(auto_id):
    data = request.json
    znacka = data.get('znacka')
    model = data.get('model')
    rok_vyroby = data.get('rok_vyroby')
    palivo = data.get('palivo')
    cena = data.get('cena')
    dostupne = data.get('dostupne')

    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    update_query = """
        UPDATE auta
        SET znacka = %s, model = %s, rok_vyroby = %s, palivo = %s, cena = %s, dostupne = %s
        WHERE id = %s
        RETURNING *;
    """
    cursor.execute(update_query, (znacka, model, rok_vyroby, palivo, cena, dostupne, auto_id))
    updated_auto = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    if updated_auto:
        return jsonify(updated_auto), 200
    else:
        return jsonify({"error": "Auto nenájdené"}), 404


# 4. (Voliteľné) Vymazanie auta
@app.route('/auta/<int:auto_id>', methods=['DELETE'])
def delete_auto(auto_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    delete_query = "DELETE FROM auta WHERE id = %s RETURNING id;"
    cursor.execute(delete_query, (auto_id,))
    deleted_id = cursor.fetchone()
    conn.commit()

    cursor.close()
    conn.close()

    if deleted_id:
        return jsonify({"deleted_id": deleted_id[0]}), 200
    else:
        return jsonify({"error": "Auto nenájdené"}), 404


# ----------------------
# Spustenie servera
# ----------------------
if __name__ == '__main__':
    app.run(debug=True)
