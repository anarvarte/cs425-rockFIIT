import requests

api_host = 'http://localhost:5000'

newUser1 = {'userName':'NewUser1@gmail.com', 'password':'flowers682',
'firstName':'Billy', 'weight':150}

newUser2 = {'userName':'NewUser2@gmail.com', 'password':'admin12345',
'firstName':'Dora', 'weight':130}

path = '/addUser'
response = requests.post(api_host + path, json=newUser1)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
