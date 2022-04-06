import requests

api_host = 'http://localhost:5000'

userName = 'user1@gmail.com'
path = '/activities/' + str(userName) + ''
response = requests.get(api_host + path)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
