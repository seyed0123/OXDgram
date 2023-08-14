from django.urls import path
from .views import IndexView

urlpatterns = [
    path('hello', IndexView.as_view(), name='hello'),
]
