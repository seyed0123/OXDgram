from django.urls import path
from .views import Create
from .views import setting
from .views import profile
from .views import banner
from .views import login
from .views import logout
from .views import check

urlpatterns = [
    path('create/', Create.as_view(), name='create'),
    path('setting/<int:person_id>/', setting.as_view(), name='setting'),
    path('profile', profile.as_view(), name='profile'),
    path('banner', banner.as_view(), name='banner'),
    path('login', login.as_view(), name='login'),
    path('logout/', logout.as_view(), name='logout'),
    path('check/', check.as_view(), name='check')
]
