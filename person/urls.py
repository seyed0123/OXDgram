from django.urls import path
from .views import Create
from .views import setting

urlpatterns = [
    path('create', Create.as_view(), name='create'),
    path('setting/<int:person_id>/', setting.as_view(), name='setting')
]
