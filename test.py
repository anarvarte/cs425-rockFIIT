import sqlite3
import bcrypt
DATABASE = 'rockFIITversion2.db'
#requiredFields = ('userName', 'password', 'firstName','unitPreference',
#'weight')

#print(",".join(requiredFields))

#query = "INSERT INTO userTable (userName, password, firstName, unitPreference, weight) VALUES ('billy2@gmail.com', 'asdjfaksdjf', 'Billy', 'lbs', 150)"
#query = 'INSERT INTO ' + 'userTable' + " (" + ",".join(requiredFields) + ') VALUES(?,?,?,?,?)'

#print(query)
password = "hahabing123".encode()
hashedPwd = bcrypt.hashpw(password, bcrypt.gensalt())

anotherPwd = "asdf".encode()
anotherHashed = bcrypt.hashpw(anotherPwd, bcrypt.gensalt())
print(hashedPwd.decode())
print(bcrypt.checkpw(password, hashedPwd))
print(bcrypt.checkpw(anotherPwd,anotherHashed))

'''try:
    con = sqlite3.connect(DATABASE)
    cur = con.cursor()
    cur.execute(query)
except sqlite3.Error as err:
    print(err)
finally:
    con.close()
'''
