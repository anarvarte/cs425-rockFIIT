import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'

newUser1 = {'userName':'newUser1@gmail.com', 'password':'asdfjjoinnas',
'firstName':'Billy', 'weight':150}

newUser2 = {'userName':'newUser2@gmail.com', 'password':'password112213',
'firstName':'Dora', 'weight':130}

path = '/addExercise'
response = requests.post(api_host + path, json=newUser1)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
