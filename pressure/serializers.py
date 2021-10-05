from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from .models import BloodPressure


class BloodPressureSerializer(ModelSerializer):
    class Meta:
        model = BloodPressure
        fields = '__all__'
