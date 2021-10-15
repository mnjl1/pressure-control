from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import BloodPressure
from .serializers import BloodPressureSerializer
from weather.utils import get_weather, convert_weather, get_city_by_public_ip, get_client_ip

@api_view(['GET'])
def getRoutes(request):
	routes = [
        {
            'Endpoint': '/pressure/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of pressure'
        },
        {
            'Endpoint': '/pressure/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/pressure/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/pressure/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/pressure/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
	return Response(routes)


@api_view(['GET'])
def getPressureList(request):
    pressure_list = BloodPressure.objects.all()
    serialiser = BloodPressureSerializer(pressure_list, many=True)
    return Response(serialiser.data)


@api_view(['GET'])
def getPressure(request, pk):
    pressure = BloodPressure.objects.get(id=pk)
    serialiser = BloodPressureSerializer(pressure, many=False)
    return Response(serialiser.data)


@api_view(['POST'])
def create_pressure(request):
    data = request.data
    ip = get_client_ip(request)
    city = get_city_by_public_ip(ip)
    units = request.user.metric
    weather_now = get_weather(city, units)
    weather = convert_weather(weather_now)
    weather.save()
    systolic_pressure = data['systolic_pressure']
    diastolic_pressure = data['diastolic_pressure']
    heart_rate = data['heart_rate']
    note = data['note']
    pressure = BloodPressure.objects.create(
        systolic_pressure = systolic_pressure,
        diastolic_pressure = diastolic_pressure,
        heart_rate = heart_rate,
        note = note,
        weather=weather
    )
    serializer = BloodPressureSerializer(pressure, many = False)
    return Response(serializer.data)


@api_view(['PUT'])
def update_pressure(request, pk):
    data = request.data
    pressure = BloodPressure.objects.get(id=pk)
    serializer = BloodPressureSerializer(instance=pressure, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_pressure(request, pk):
    pressure = BloodPressure.objects.get(id=pk)
    pressure.delete()
    return Response('Pressure was deleted')