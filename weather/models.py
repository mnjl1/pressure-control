from django.db import models


class Weather(models.Model):
    city = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    temperature = models.CharField(max_length=10)
    atmosphere_pressure = models.CharField(max_length=10)
    humidity = models.CharField(max_length=10)
    icon = models.CharField(max_length=10)