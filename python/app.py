from flask import Flask,request,jsonify, make_response
from flask_cors import CORS
import json
import mysql.connector

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)
# Read
@app.route("/humans")
def read():
  mydb = mysql.connector.connect(user='admin', password='1234', host='sql_db', port='3306',database='mysql_db')
  mycursor = mydb.cursor(dictionary=True)
  mycursor.execute("SELECT * FROM employees")
  myresult = mycursor.fetchall()
  return make_response(jsonify(myresult),200)

# Create
@app.route("/humans", methods =['POST'])
def create():
  data = request.get_json()
  mydb = mysql.connector.connect(user='admin', password='1234', host='sql_db', port='3306',database='mysql_db')
  mycursor = mydb.cursor(dictionary=True)
  sql = "INSERT INTO employees(F_name,L_name) VALUES (%s,%s)"
  val = (data['F_name'],data['L_name'])
  mycursor.execute(sql,val)
  mydb.commit()
  return make_response(jsonify({"rowcount": mycursor.rowcount}),200)

# Update
@app.route("/humans/<id>", methods =['PUT'])
def update(id):
  data = request.get_json()
  mydb = mysql.connector.connect(user='admin', password='1234', host='sql_db', port='3306',database='mysql_db')
  mycursor = mydb.cursor(dictionary=True)
  sql = "UPDATE employees SET F_name = %s, L_name = %s WHERE id = %s"
  val = (data['F_name'],data['L_name'],id)
  mycursor.execute(sql,val)
  mydb.commit()
  return make_response(jsonify({"rowcount": mycursor.rowcount}),200)

# Delete
@app.route("/humans/<id>", methods =['DELETE'])
def delete(id):
  mydb = mysql.connector.connect(user='admin', password='1234', host='sql_db', port='3306',database='mysql_db')
  mycursor = mydb.cursor(dictionary=True)
  sql = "DELETE FROM employees WHERE id = %s"
  val = (id,)
  mycursor.execute(sql,val)
  mydb.commit()
  return make_response(jsonify({"rowcount": mycursor.rowcount}),200)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)