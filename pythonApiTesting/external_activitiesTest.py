import requests

api_host = 'https://servertesting.juancaridad.repl.co'


data = {'userName':'NewUser3@gmail.com', 'password':'gamer7759'}

data2 = {'userName':'Mari@gmail.com', 'password':'password'}


path = '/activities'
response = requests.get(api_host+path, json=data)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
