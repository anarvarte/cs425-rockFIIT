import requests

api_host = 'http://172.27.110.241:5000'

path = '/exercises'
response = requests.get(api_host + path)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
