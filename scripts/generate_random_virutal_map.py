'''
    this script is used to generate random 3D GeoJSON file 

    1. every road has 40 width, buildings were around every road, and the road 's length is 1000
    2. every building has a random height, and the building's width is 80
    3. building is rectangle, and the building's length is 80
    4. make sure the building is not overlap with other buildings
'''

import random
import json

def generate_random_building(road_id, road_length, road_width):
    '''
        generate random building
    '''
    building_id = 0
    building_list = []
    while road_length > 0:
        building_length = 80
        building_width = 80
        building_height = random.randint(1, 10)
        building_id += 1
        building = {
            "type": "Feature",
            "properties": {
                "id": building_id,
                "road_id": road_id,
                "height": building_height
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            road_length,
                            road_width
                        ],
                        [
                            road_length,
                            road_width + building_width
                        ],
                        [
                            road_length - building_length,
                            road_width + building_width
                        ],
                        [
                            road_length - building_length,
                            road_width
                        ],
                        [
                            road_length,
                            road_width
                        ]
                    ]
                ]
            }
        }
        building_list.append(building)
        road_length -= building_length
    return building_list

def generate_random_road(road_id, road_length, road_width):
    '''
        generate random road
    '''
    road = {
        "type": "Feature",
        "properties": {
            "id": road_id,
            "length": road_length,
            "width": road_width
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [
                    0,
                    road_width
                ],
                [
                    road_length,
                    road_width
                ]
            ]
        }
    }
    return road

def generate_random_map():
    '''
        generate random map
    '''
    road_id = 0
    road_width = 40
    road_length = 1000
    road_list = []
    building_list = []
    while road_width < 1000:
        road_id += 1
        road = generate_random_road(road_id, road_length, road_width)
        road_list.append(road)
        building_list += generate_random_building(road_id, road_length, road_width)
        road_width += 40
    return road_list, building_list

def save_to_geojson(road_list, building_list):
    '''
        save to geojson
    '''
    geojson = {
        "type": "FeatureCollection",
        "features": road_list + building_list
    }
    with open("scripts/random_map.geojson", "w") as f:
        json.dump(geojson, f)

if __name__ == "__main__":
    road_list, building_list = generate_random_map()
    save_to_geojson(road_list, building_list)