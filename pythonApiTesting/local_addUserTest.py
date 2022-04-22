import requests

api_host = 'http://localhost:5000'

newUser = {'userName':'newestUser@gmail.com', 'password':'passwordTest',
'firstName':'Gordan', 'weight':200}

path = '/addUser'
response = requests.post(api_host + path, json=newUser)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
