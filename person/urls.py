from django.urls import path
from .views import Create

urlpatterns = [
    path('create', Create.as_view(), name='hello'),
]
