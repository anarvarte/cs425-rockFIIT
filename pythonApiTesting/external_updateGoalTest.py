import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'

data = {'userName':'NewUser3@gmail.com', 'goalName' : 'gain 15lbs',
        'completed': 1, 'password':'gamer775'}


path = '/updateGoal'
response = requests.post(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
