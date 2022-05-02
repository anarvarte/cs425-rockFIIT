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
programTable = 'programTable'
goalTable = 'goalTable'
defaultPrograms = 'defaultPrograms'

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
        responseMsg['info'] = 'Duplicate user'
        return jsonify(responseMsg), 400
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
@app.route('/exercises', methods=['GET','POST'])
def exercises():
    responseMsg = {'info' : '', 'data' : False}
    query = 'SELECT * FROM ' + exerciseLibrary

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        responseMsg['data'] = cur.execute(query).fetchall()
        responseMsg['info'] = 'Successfully retrieved all exercises'
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
    password = msg[requiredFields[len(requiredFields)-1]]
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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
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
@app.route('/activities', methods=['GET', 'POST'])
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
        return jsonify(responseMsg), 401

    userName = msg[requiredFields[0]]
    password = msg[requiredFields[len(requiredFields)-1]]

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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()


    if bcrypt.checkpw(password.encode(), dbPwd):
        query = 'SELECT * FROM ' + exerciseLog + ' WHERE userName = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            responseMsg['data'] = cur.execute(query,[userName]).fetchall()
            responseMsg['info'] = 'Successfully retrieved user activity logs'
            return jsonify(responseMsg), 200
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403



# Route to add new user program
@app.route('/addProgram', methods=['POST'])
def addProgram():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'programName', 'exercise1', 'exercise2',
                      'exercise3', 'exercise4', 'exercise5', 'password')
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
    password = msg[requiredFields[len(requiredFields)-1]]
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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()


    if bcrypt.checkpw(password.encode(), dbPwd):
        insertQuery = 'INSERT INTO ' + programTable + " (" + \
        ','.join(requiredFields[:len(requiredFields)-1]) + \
        ') VALUES(?,?,?,?,?,?,?)'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            cur.execute(insertQuery,list(msg.values()))
            con.commit()

            responseMsg['info'] = 'Successfully added program'
            return jsonify(responseMsg), 201
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403


# Route to get a user's programs from the programTable
@app.route('/programs', methods=['GET', 'POST'])
def programs():
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
    password = msg[requiredFields[len(requiredFields)-1]]

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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()

    if bcrypt.checkpw(password.encode(), dbPwd):
        query = 'SELECT * FROM ' + programTable + ' WHERE userName = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            responseMsg['data'] = cur.execute(query,[userName]).fetchall()
            responseMsg['info'] = 'Successfully retrieved the programs'
            return jsonify(responseMsg), 200
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403

@app.route('/getProgram', methods=['GET'])
def getProgram():
    responseMsg = {'info' : '', 'data' : False}
    query = 'SELECT * FROM ' + defaultPrograms

    try:
        con = sqlite3.connect(DATABASE)
        cur = con.cursor()
        responseMsg['data'] = cur.execute(query).fetchall()
        responseMsg['info'] = 'Successfully retrieved all exercises'
        return jsonify(responseMsg), 200
    except sqlite3.Error as err:
        responseMsg['info'] = err.args[0]
        return jsonify(responseMsg), 500
    finally:
        con.close()

# Route to delete a user's program
@app.route('/delProgram', methods=['POST'])
def delProgram():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'programID', 'password')
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
    programID = msg[requiredFields[1]]
    password = msg[requiredFields[len(requiredFields)-1]]
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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()


    if bcrypt.checkpw(password.encode(), dbPwd):
        deleteQuery ='DELETE FROM ' + programTable + ' WHERE ' + \
        'userName = ? AND programID = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            cur.execute(deleteQuery, (userName,programID))
            con.commit()

            responseMsg['info'] = 'Successfully deleted program'
            return jsonify(responseMsg), 201
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403

# Route to add new user goal
@app.route('/addGoal', methods=['POST'])
def addGoal():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'exerciseGoal', 'weightGoal', 'completed', 'date', 'password')
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
    password = msg[requiredFields[len(requiredFields)-1]]
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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()


    if bcrypt.checkpw(password.encode(), dbPwd):
        insertQuery = 'INSERT INTO ' + goalTable + " (" + \
        ','.join(requiredFields[:len(requiredFields)-1]) + \
        ') VALUES(?,?,?,?,?)'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            cur.execute(insertQuery,list(msg.values()))
            con.commit()

            responseMsg['info'] = 'Successfully added goal'
            return jsonify(responseMsg), 201
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403


# Route to update a user's goal
@app.route('/updateGoal', methods=['POST'])
def updateGoal():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'exerciseGoal', 'weightGoal', 'completed', 'password')
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
    exerciseGoal = msg[requiredFields[1]]
    weightGoal = msg[requiredFields[2]]
    completed = msg[requiredFields[3]]
    password = msg[requiredFields[len(requiredFields)-1]]
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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()


    if bcrypt.checkpw(password.encode(), dbPwd):
        updateQuery = 'UPDATE ' + goalTable + ' SET completed = ?' + \
        ' WHERE userName = ? AND exerciseGoal = ? AND weightGoal = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            cur.execute(updateQuery, (completed, userName, exerciseGoal, weightGoal))
            con.commit()

            responseMsg['info'] = 'Successfully updated goal'
            return jsonify(responseMsg), 201
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403


# Route to delete a user's goal
@app.route('/delGoal', methods=['POST'])
def delGoal():
    responseMsg = {'info' : '', 'data' : False}
    requiredFields = ('userName', 'goalID', 'password')
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
    goalID = msg[requiredFields[1]]
    password = msg[requiredFields[len(requiredFields)-1]]
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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()


    if bcrypt.checkpw(password.encode(), dbPwd):
        deleteQuery ='DELETE FROM ' + goalTable + ' WHERE ' + \
        'userName = ? AND goalID = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            cur.execute(deleteQuery, (userName,goalID))
            con.commit()

            responseMsg['info'] = 'Successfully deleted goal'
            return jsonify(responseMsg), 201
        except sqlite3.Error as err:
            responseMsg['info'] = err.args[0]
            return jsonify(responseMsg), 500
        finally:
            con.close()
    else:
        responseMsg['info'] = 'Authentication failed'
        return jsonify(responseMsg), 403


# Route to get a user's goals from the goalTable
@app.route('/goals', methods=['GET','POST'])
def goals():
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
    password = msg[requiredFields[len(requiredFields)-1]]

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

    if dbPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        dbPwd = dbPwd[0].encode()

    if bcrypt.checkpw(password.encode(), dbPwd):
        query = 'SELECT * FROM ' + goalTable + ' WHERE userName = ?'

        try:
            con = sqlite3.connect(DATABASE)
            cur = con.cursor()
            responseMsg['data'] = cur.execute(query,[userName]).fetchall()
            responseMsg['info'] = 'Successfully retrieved goals'
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

    if oldHashedPwd == None:
        responseMsg['info'] = 'No user found with that userName'
        return jsonify(responseMsg), 401
    else:
        oldHashedPwd = oldHashedPwd[0].encode()


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
