import requests

api_host = 'http://localhost:5000'

data = {'userName':'newestUser@gmail.com', 'goalName' : 'Lose 25lbs',
        'completed': 0, 'password':'passwordTest'}


path = '/addGoal'
response = requests.post(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
