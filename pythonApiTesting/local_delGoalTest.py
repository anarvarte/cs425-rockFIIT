import requests

api_host = 'http://localhost:5000'

data = {'userName':'NewUser3@gmail.com', 'goalID' : 1,
        'password':'gamer775'}


path = '/delGoal'
response = requests.post(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
