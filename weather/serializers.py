from django.db import models
from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from .models import Weather


class WeatherSerializer(ModelSerializer):
    class Meta:
        model = Weather
        fields = '__all__'