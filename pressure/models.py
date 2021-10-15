from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from weather.models import Weather

class BloodPressure(models.Model):
    # TODO add uuid
    person = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,)
    systolic_pressure = models.IntegerField()
    diastolic_pressure = models.IntegerField()
    heart_rate = models.IntegerField()
    note = models.TextField(null=True, blank=True)
    last_modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    weather = models.OneToOneField(
        Weather, on_delete=models.CASCADE, default=None)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.note