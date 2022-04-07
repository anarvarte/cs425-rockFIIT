# Author:   Louis Doherty

from flask import Flask, jsonify, request
import sqlite3
import bcrypt
import json

# Global Variables + Constants
DATABASE = 'rockFIITServer.db'
exerciseLibrary = 'exerciseLibrary'
exerciseLog = 'exerciseLog'
userTable = 'userTable'

app = Flask(__name__)


# Index Page Test
@app.route('/')
def index():
    return jsonify('RockFIIT Server API Homepage')


# Route to add a user to the server-side database
@app.route('/addUser', methods=['POST'])
def addUser():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'password', 'firstName', 'weight')
    try:
        msg = request.json
        #print(msg)
        for field in requiredFields:
            if field not in msg:
                responseMsg['info'] = 'Missing required field'
                return jsonify(responseMsg), 400
    except:
        responseMsg['info'] = 'Request not json content'
        return jsonify(responseMsg), 400

    insertQuery = 'INSERT INTO ' + userTable + " (" + \
    ",".join(requiredFields) + ') VALUES(?,?,?,?)'

    # Store hashed password
    plaintext = msg[requiredFields[1]]
    hashedPwd = bcrypt.hashpw(plaintext.encode(), bcrypt.gensalt())
    msg[requiredFields[1]] = hashedPwd.decode()

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        cur.execute(insertQuery,list(msg.values()))
        con.commit()

        responseMsg['info'] = 'Successfully added user'
        return jsonify(responseMsg), 201
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()

# Route to add an exercise to the exercise table
@app.route('/addExercise', methods=['POST'])
def addExercise():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('Category', 'Exercises', 'Description', 'Sets',
                      'Reps', 'Link')
    try:
        msg = request.json
        #print(msg)
        for field in requiredFields:
            if field not in msg:
                responseMsg['info'] = 'Missing required field'
                return jsonify(responseMsg), 400
    except:
        responseMsg['info'] = 'Request not json content'
        return jsonify(responseMsg), 400

    insertQuery = 'INSERT INTO ' + exerciseLibrary + " (" + \
    ",".join(requiredFields) + ') VALUES(?,?,?,?,?,?)'

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        cur.execute(insertQuery,list(msg.values()))
        con.commit()

        responseMsg['info'] = 'Successfully added exercise'
        return jsonify(responseMsg), 201
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()


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


# Route to log new exercises completed
@app.route('/logActivity', methods=['POST'])
def logActivity():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'exerciseID', 'setsCompleted',
                      'repsCompleted', 'weight', 'notes', 'date', 'password')
    try:
        msg = request.json
        for field in requiredFields:
            if field not in msg:
                responseMsg['info'] = 'Missing required field'
                return jsonify(responseMsg), 400
    except:
        responseMsg['info'] = 'Request not json content'
        return jsonify(responseMsg), 400

    userName = msg[requiredFields[0]]
    password = msg[requiredFields[7]]
    del msg['password']

    findUserQuery = 'SELECT password FROM ' + userTable + ' WHERE ' + \
    'userName = ?'

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        dbPwd = cur.execute(findUserQuery, [userName]).fetchone()
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()
    dbPwd = dbPwd[0].encode()


    if bcrypt.checkpw(password.encode(), dbPwd):
        insertQuery = 'INSERT INTO ' + exerciseLog + " (" + \
        ','.join(requiredFields[:len(requiredFields)-1]) + \
        ') VALUES(?,?,?,?,?,?,?)'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            cur.execute(insertQuery,list(msg.values()))
            con.commit()

            responseMsg['info'] = 'Successfully logged exercise'
            return jsonify(responseMsg), 201
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403


# Route to get a user's logged activites from exerciseLog
@app.route('/activities', methods=['GET'])
def activities():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'password')

    try:
        msg = request.json
        for field in requiredFields:
            if field not in msg:
                responseMsg['info'] = 'Missing required field'
                return jsonify(responseMsg), 400
    except:
        responseMsg['info'] = 'Request not json content'
        return jsonify(responseMsg), 400

    userName = msg[requiredFields[0]]
    password = msg[requiredFields[1]]

    # Authentication for users
    findUserQuery = 'SELECT password FROM ' + userTable + ' WHERE ' + \
    'userName = ?'

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        dbPwd = cur.execute(findUserQuery, [userName]).fetchone()
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()

    dbPwd = dbPwd[0].encode()

    if bcrypt.checkpw(password.encode(), dbPwd):
        query = 'SELECT * FROM ' + exerciseLog + ' WHERE userName = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            responseMsg['data'] = cur.execute(query,[userName]).fetchall()
            return jsonify(responseMsg), 200
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403


# Route to allow users to change their password
@app.route('/changePassword', methods=['POST'])
def changePassword():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'oldPwd', 'newPwd')

    try:
        msg = request.json
        #print(msg)
        for field in requiredFields:
            if field not in msg:
                responseMsg['info'] = 'Missing required field'
                return jsonify(responseMsg), 400
    except:
        responseMsg['info'] = 'Request not json content'
        return jsonify(responseMsg), 400


    userName = msg[requiredFields[0]]
    oldPwd = msg[requiredFields[1]]
    newPwd = msg[requiredFields[2]]

    findUserQuery = 'SELECT password FROM ' + userTable + ' WHERE ' + \
    'userName = ?'
    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        oldHashedPwd = cur.execute(findUserQuery, (userName,)).fetchone()
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()


    oldHashedPwd = oldHashedPwd[0].encode()
    #print(oldHashedPwd)

    if bcrypt.checkpw(oldPwd.encode(), oldHashedPwd):

        # Update hashed password
        plaintext = newPwd
        hashedPwd = bcrypt.hashpw(plaintext.encode(), bcrypt.gensalt())
        newPwd = hashedPwd.decode()

        updateQuery = 'UPDATE ' + userTable + ' SET password = ?' + \
        ' WHERE userName = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            cur.execute(updateQuery, (newPwd, userName))
            con.commit()

            responseMsg['info'] = 'Successfully updated password'
            return jsonify(responseMsg), 201
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403



app.run(host = '0.0.0.0')
