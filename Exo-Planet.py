from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DB_NAME = 'exoPlanets'
COLLECTION_NAME = 'project'


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/exoPlanets')
def chart():
    return render_template('exo.html')

@app.route('/stars')
def stars():
    return render_template('stars.html')

@app.route('/keplerData/exoPlanets')
def planet_charts():

    FIELDS = {
        '_id': False,
        'PlanetIdentifier': True,
        'DiscoveryYear':True,
        'DiscoveryMethod': True,
        'ListPlanetsIsOn': True,
        'PeriodDays': True,
        'TypeFlag': True
    }

    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DB_NAME][COLLECTION_NAME]
        projects = collection.find(projection = FIELDS, limit = 55000)
        return json.dumps(list(projects))





if __name__ == '__main__':
    app.run(debug=True)
