import requests

api_host = 'http://localhost:5000'

path = '/exercises'
response = requests.get(api_host + path)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
