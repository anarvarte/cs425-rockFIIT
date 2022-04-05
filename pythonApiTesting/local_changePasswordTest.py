import requests

api_host = 'http://localhost:5000'

changeAlicePwd = {'userName':'NewUser3@gmail.com', 'oldPwd':'flowers682',
'newPwd':'gamer775'}



path = '/changePassword'
response = requests.post(api_host + path, json=changeAlicePwd)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
