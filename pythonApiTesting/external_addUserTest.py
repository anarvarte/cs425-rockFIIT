import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'

newUser3 = {'userName':'newUser3@gmail.com', 'password':'sadfa',
'firstName':'Billy', 'weight':150}

newUser2 = {'userName':'newUser2@gmail.com', 'password':'password112213',
'firstName':'Dora', 'weight':130}

path = '/addUser'
response = requests.post(api_host + path, json=newUser3)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
