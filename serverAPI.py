# Author:   Louis Doherty

from flask import Flask, jsonify, request
import sqlite3
import bcrypt
import json

# Global Variables + Constants
DATABASE = 'rockFIITversion2.db'
exerciseLibrary = 'exerciseLibrary'
exerciseLog = 'exerciseLog'
userTable = 'userTable'

app = Flask(__name__)


# Index Page Test
@app.route("/")
def index():
    return jsonify([1,2,3,4,5, "asdf"])


# Route to get a specific exercise from the exerciseLibrary table
@app.route('/exercise/<exerciseID>', methods=['GET'])
def exercise(exerciseID):
    responseMsg = {'info' : '', 'data' : False}
    query = 'SELECT * FROM ' + exerciseLibrary + ' WHERE exerciseID = ?'

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        responseMsg['data'] = cur.execute(query,(exerciseID)).fetchone()
        return jsonify(responseMsg), 200
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()


# Route to get entire exerciseLibrary table
@app.route('/exercises', methods=['GET'])
def exercises():
    responseMsg = {'info' : '', 'data' : False}
    query = 'SELECT * FROM ' + exerciseLibrary

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        responseMsg['data'] = cur.execute(query).fetchall()
        return jsonify(responseMsg), 200
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()


# Route to add a user to the server-side database
@app.route('/addUser', methods=['POST'])
def addUser():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'password', 'firstName','unitPreference',
    'weight')
    try:
        msg = request.json
        #print(msg)
        for field in requiredFields:
            if field not in msg:
                responseMsg["info"] = "Missing required field"
                return jsonify(responseMsg), 400
    except:
        responseMsg["info"] = "Request not json content"
        return jsonify(responseMsg), 400

    insertQuery = 'INSERT INTO ' + 'userTable' + " (" + ",".join(requiredFields) + ') VALUES(?,?,?,?,?)'

    # store hashed password

    plaintext = msg[requiredFields[1]]
    hashedPwd = bcrypt.hashpw(plaintext.encode(), bcrypt.gensalt())
    msg[requiredFields[1]] = hashedPwd.decode()
    print(msg[requiredFields[1]])

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        # check if user does not exist (403 response)
        # Use SELECT statement for userName
            # close db before return
        cur.execute(insertQuery,list(msg.values()))
        con.commit()

        responseMsg["info"] = "Successfully added user"
        return jsonify(responseMsg), 201
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()


# POST request to log new exercises completed
@app.route("/logActivity", methods=["POST"])
def logActivity():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ("userName", "exerciseName")#,"firstName", "lastName", "weight")
    try:
        msg = request.json
        for field in requiredFields:
            if field not in msg:
                responseMsg["info"] = "Missing required field"
                return jsonify(responseMsg), 400
    except:
        responseMsg["info"] = "Request not json content"
        return jsonify(responseMsg), 400

    # open database
    # authenticate user (hash password and compare to stored hashed password)
        # responseMsg["error"] = "Unauthorized"
        # return jsonify(responseMsg), 401
    # write into exerciseLog
        # close db before return
    # add user to database
    # close database
    responseMsg["result"] = "Successfully updated exerciseLog table"
    return jsonify(responseMsg), 201
