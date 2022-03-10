import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'

path = '/exercises'
response = requests.get(api_host + path)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
