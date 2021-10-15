import requests
import json
from .models import Weather

from config.settings import WEATHER_KEY, IPSTACK_KEY

def get_weather(city, units):
    # TODO move open weather stack access key to environs
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


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_city_by_public_ip(ip):
    url = f'http://api.ipstack.com/{ip}?access_key={IPSTACK_KEY}&format=1'
    headers = {
        'accept': 'application/json',
        'content-type': 'application/json'
    }
    try:
        response = requests.request("GET", url, headers=headers)
    except:
        print('timeout')
    respond = json.loads(response.text)
    return respond['city']
