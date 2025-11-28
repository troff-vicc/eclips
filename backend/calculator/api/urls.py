from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import WayViewSet

calc_router = DefaultRouter()
calc_router.register(r'calc', WayViewSet)
