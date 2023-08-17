from django.urls import path
from .views import Create
from .views import setting
from .views import profile

urlpatterns = [
    path('create', Create.as_view(), name='create'),
    path('setting/<int:person_id>/', setting.as_view(), name='setting'),
    path('profile', profile.as_view(), name='profile')
]
