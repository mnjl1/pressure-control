from rest_framework import serializers
from django.contrib.auth import get_user_model


CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'metric']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instanse = self.Meta.model(**validated_data)
        if password is not None:
            instanse.set_password(password)
        instanse.save()
        return instanse