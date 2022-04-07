import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'

data = {'userName':'NewUser3@gmail.com', 'exerciseID': 1, 'setsCompleted':5,
        'repsCompleted': 5, 'weight': 225,'notes': 'Easy peasy',
        'date':'4/6/2022', 'password':'gamer775'}


path = '/logActivity'
response = requests.post(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
