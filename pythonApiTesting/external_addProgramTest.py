import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'

data = {'userName':'NewUser3@gmail.com', 'programName' : 'example',
        'exercise1': 1, 'exercise2': 3, 'exercise3': 2, 'exercise4': 4,
        'exercise5': 5, 'password':'gamer775'}


path = '/addProgram'
response = requests.post(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
