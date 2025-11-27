from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import NewsViewSet

news_router = DefaultRouter()
news_router.register(r'news', NewsViewSet)