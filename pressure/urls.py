from django.urls import path
from . import views

urlpatterns = [
	path('', views.getRoutes, name='routes'),
	path('pressure/', views.getPressureList, name='pressure_list' ),
	path('pressure/create/', views.create_pressure, name = 'create-pressure'),
	path('pressure/<str:pk>/update/', views.update_pressure, name='update-pressure' ),
	path('pressure/<str:pk>/delete/', views.delete_pressure, name='delete-pressure' ),
	path('pressure/<str:pk>/', views.getPressure, name='pressure' ),
]