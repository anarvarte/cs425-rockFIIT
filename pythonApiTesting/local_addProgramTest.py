import requests

api_host = 'http://localhost:5000'

data = {'userName':'NewUser3@gmail.com', 'programName' : 'legs', 'exerciseID': 1, 'password':'gamer775'}


path = '/addProgram'
response = requests.post(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')