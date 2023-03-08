'''
    this script is used to generate random 3D GeoJSON file 

    1. every road has 40 width, buildings were around every road, and the road 's length is 1000
    2. every building has a random height, and the building's width is 80
    3. building is rectangle, and the building's length is 80
    4. make sure the building is not overlap with other buildings
'''

import random
import json
import math

map_width = 1000
map_lenth = 1000
road_width = 40
building_width = 80
building_height = 0
building_lenth = 80

class Rect:
    x: int
    y: int
    width: int
    length: int
    height: int

    def __init__(self, x, y, width, length):
        self.x = x
        self.y = y
        self.width = width
        self.length = length

    def corss(self, rect):
        if self.x > rect.x + rect.width:
            return False
        if self.x + self.width < rect.x:
            return False
        if self.y > rect.y + rect.length:
            return False
        if self.y + self.length < rect.y:
            return False
        return True

map = []

def generate_random_map():
    current_x = 0
    current_y = 0

    while True:
        if current_y > map_lenth:
            break

        current_x = 0
        while True:
            if current_x > map_width:
                break

            random_choice = random.randint(0, 1)
            tmp_building_width = 0
            if random_choice == 1:
                if (current_x + building_width * 2 + road_width) < map_lenth:
                    tmp_building_width = building_width * 2 + road_width
            
            if tmp_building_width == 0:
                tmp_building_width = building_width
                
            building = Rect(current_x, current_y, tmp_building_width, building_lenth)
            building_height = random.randint(1, 10000) * 10
            building.height = building_height
            map.append(building)

            current_x += road_width + tmp_building_width
        
        current_y += road_width + building_lenth

def generate_geojson():
    geojson = {
        "features": []
    }

    for building in map:
        feature = {
            "type": "Feature",
            "properties": {
                "height": 0,
                "name" : f'{len(geojson["features"])}',
                "level": 1,
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [building.x, building.y],
                        [building.x + building.width, building.y],
                        [building.x + building.width, building.y + building.length],
                        [building.x, building.y + building.length],
                        [building.x, building.y]
                    ]
                ]
            }
        }

        geojson["features"].append(feature)

    return geojson

def main():
    generate_random_map()
    geojson = generate_geojson()

    with open('scripts/random_map.geojson', 'w') as f:
        json.dump(geojson, f)

if __name__ == '__main__':
    main()