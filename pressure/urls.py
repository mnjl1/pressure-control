from django.urls import path
from . import views

urlpatterns = [
	path('', views.getRoutes, name='routes'),
	path('pressure/', views.getPressureList, name='pressure_list' ),
	path('pressure/<str:pk>/update/', views.updatePressure, name='update-pressure' ),
	path('pressure/<str:pk>/', views.getPressure, name='pressure' ),
]