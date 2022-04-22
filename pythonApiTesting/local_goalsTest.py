import requests

api_host = 'http://localhost:5000'

data = {'userName':'newestUser@gmail.com', 'password':'passwordTest'}


path = '/goals'
response = requests.get(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
