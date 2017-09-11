from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

"""
MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'nasaExoData')
COLLECTION_NAME = 'project' 
"""

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DB_NAME = 'nasaExoData'
COLLECTION_NAME = 'project'


# Page Nav
@app.route('/')
def index():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/exoPlanets')
def chart():
    return render_template('exo.html')

@app.route('/stars')
def stars():
    return render_template('stars.html')

@app.route('/data/nasaExoPlanets')
def planet_charts():

    FIELDS = {
        '_id': False,
        'PlanetName': True,
        'HostName': True,
        'DiscoveryYear': True,
        'Updated': True,
        'DiscoveryMethod': True,
        'PlaceOfDiscovery': True,
        'DiscoveryFacility': True,
        'Telescope': True,
        'Status': True
    }

    """
    withMongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection = FIELDS, limit = 10000)
        return json.dumps(list(projects))
    """
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DB_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS, limit=10000)
        return json.dumps(list(projects))



# About Dropdown
@app.route('/about/discovery_method')
def discover_method():
    return render_template('about/discovery_method.html')

@app.route('/about/place_of_discovery')
def place_of_discovery():
    return render_template('about/place_of_discovery.html')

@app.route('/about/the_data')
def the_data():
    return render_template('about/the_data.html')

if __name__ == '__main__':
    app.run(debug=True)
