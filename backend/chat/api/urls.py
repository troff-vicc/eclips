from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet

chat_router = DefaultRouter()
chat_router.register(r'chat', ChatViewSet, basename='chat')
