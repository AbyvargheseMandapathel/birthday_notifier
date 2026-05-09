from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BirthdayRecordViewSet

router = DefaultRouter()
router.register(r'', BirthdayRecordViewSet, basename='birthday')

urlpatterns = [
    path('', include(router.urls)),
]
