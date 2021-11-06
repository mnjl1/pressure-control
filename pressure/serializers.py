from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from .models import BloodPressure
from weather.serializers import WeatherSerializer




class BloodPressureSerializer(ModelSerializer):
    weather = WeatherSerializer(many=False, read_only=True)
    class Meta:
        model = BloodPressure
        fields = '__all__'
