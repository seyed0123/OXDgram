from django.urls import path
from .views import info
from .views import new

urlpatterns = [
    path('info/<int:post_id>/', info.as_view(), name='info'),
    path('new/', new.as_view(), name='new')
]