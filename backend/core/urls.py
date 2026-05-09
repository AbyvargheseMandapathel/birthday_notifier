from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/users/', include('users.urls')),
    path('api/birthdays/', include('birthdays.urls')),
]
