import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'


data = {'userName':'NewUser3@gmail.com', 'password':'gamer775'}


path = '/activities'
response = requests.get(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
