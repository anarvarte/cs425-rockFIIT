import requests
api_host = "http://localhost:5000"
#response = requests.get(api_host)

'''response = requests.get(api_host+"/")
print()
print(response.status_code)
print(response.content)
print(response.json())

newUser = {"userName" : "billy@gmail.com", "password": "asdjfaksdjf" }
path = "/addUser"
response = requests.post(api_host + path, json=newUser)
print()
print(response.status_code)
print(response.content)
try:
    print(response.json())
except:
    print("Response not json")

'''

'''
exerciseID = 4
path = "/exercise/" + str(exerciseID) + ""
response = requests.get(api_host + path)
print()
print(response.status_code)
#print(response.content)
try:
    print(response.json())
except:
    print("Response not json")
'''



path = '/exercises'
response = requests.get(api_host + path)
print()
print(response.status_code)
#print(response.content)
try:
    print(response.json())
except:
    print("Response not json")
