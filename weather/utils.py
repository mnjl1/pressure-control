import requests
import json
from .models import Weather

from config.settings import WEATHER_KEY

def get_weather(city, units):

    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&units={units}&appid={WEATHER_KEY}'
    
    try:
        city_weather = requests.get(url).json()
    except:
        print('timeout')
    return city_weather


def convert_weather(weather_now):
    new_weather = Weather(city=weather_now['name'],
                          description=weather_now['weather'][0]['description'],
                          temperature=weather_now['main']['temp'],
                          atmosphere_pressure=weather_now['main']['pressure'],
                          humidity=weather_now['main']['humidity'],
                          icon=weather_now['weather'][0]['icon'])
    return new_weather