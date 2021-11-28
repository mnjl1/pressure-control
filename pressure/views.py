from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import BloodPressure
from .serializers import BloodPressureSerializer
from weather.utils import get_weather, convert_weather
from .utils import average_diastolic_pressure, average_systolic_pressure

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
            'description': 'Returns a single pressure object'
        },
        {
            'Endpoint': '/pressure/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new pressure with data sent in post request'
        },
        {
            'Endpoint': '/pressure/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing pressure with data sent in post request'
        },
        {
            'Endpoint': '/pressure/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting pressure'
        },
    ]
	return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPressureList(request):
    """
    Displaying all the records from database by logged in user. Calculated average pressure is transfered too.
    """
    user = request.user
    pressure_list = BloodPressure.objects.filter(person=user)
    systolic_pressure_list = [p.systolic_pressure for p in pressure_list]
    diastolic_pressure_list =[p.diastolic_pressure for p in pressure_list]
    serialiser = (BloodPressureSerializer(pressure_list, many=True))
    response = [[serialiser.data], ]
    avr_sys = ('avr_systolic', str(average_systolic_pressure(systolic_pressure_list)))
    avr_dias = ('avr_duastolic', str(average_diastolic_pressure(diastolic_pressure_list)))
    response.append(avr_sys)
    response.append(avr_dias)
    return Response(response)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPressure(request, pk):
    """
    Fetching specific data by user id
    """
    pressure = BloodPressure.objects.get(id=pk)
    serialiser = BloodPressureSerializer(pressure, many=False)
    return Response(serialiser.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_pressure(request):
    """
    Creates new pressure record with fetched weather info
    """
    data = request.data
    city = data['city']
    units = request.user.metric
    print('Units', units)
    weather_now = get_weather(city, units)
    weather = convert_weather(weather_now)
    weather.save()
    systolic_pressure = data['systolic_pressure']
    diastolic_pressure = data['diastolic_pressure']
    heart_rate = data['heart_rate']
    pressure = BloodPressure.objects.create(
        person = request.user,
        systolic_pressure = systolic_pressure,
        diastolic_pressure = diastolic_pressure,
        heart_rate = heart_rate,
        weather=weather
    )
    serializer = BloodPressureSerializer(pressure, many = False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_pressure(request, pk):
    """
    Edit pressure data fetched by user id
    """
    data = request.data
    pressure = BloodPressure.objects.get(id=pk)
    serializer = BloodPressureSerializer(instance=pressure, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_pressure(request, pk):
    """
    Delet pressure record by user id
    """
    pressure = BloodPressure.objects.get(id=pk)
    pressure.delete()
    return Response('Pressure was deleted')