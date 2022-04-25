import requests

api_host = 'http://172.27.32.199:5000'

newExercise = {'Category':'Legs', 'Exercises':'Jump Squats',
'Description':'', 'Sets':5, 'Reps':30, 'Link':''}


path = '/addExercise'
response = requests.post(api_host + path, json=newExercise)
print()
print(response.status_code)
try:
    print(response.json())
except:
    print('Response not json')
