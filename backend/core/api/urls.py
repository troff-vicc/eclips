from rest_framework.routers import DefaultRouter
from news.api.urls import news_router
from calculator.api.urls import calc_router
from django.urls import path, include

router = DefaultRouter()


router.registry.extend(news_router.registry)
router.registry.extend(calc_router.registry)

urlpatterns = [
    path('', include(router.urls)),
]