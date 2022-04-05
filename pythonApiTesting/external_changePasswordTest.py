import requests

api_host = 'https://rockFIITapi.lousterrd.repl.co'

changeNewUser3Pwd = {'userName':'NewUser3@gmail.com', 'oldPwd':'flowers682',
'newPwd':'gamer775'}


path = '/changePassword'
response = requests.post(api_host + path, json=changeAlicePwd)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
