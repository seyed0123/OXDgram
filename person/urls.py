from django.urls import path
from .views import Create
from .views import setting
from .views import profile
from .views import banner
from .views import login
from .views import logout
from .views import check
from .views import follow ,search , recom , is_follow

urlpatterns = [
    path('create/', Create.as_view(), name='create'),
    path('setting/<int:person_id>/', setting.as_view(), name='setting'),
    path('profile', profile.as_view(), name='profile'),
    path('banner', banner.as_view(), name='banner'),
    path('login', login.as_view(), name='login'),
    path('logout/', logout.as_view(), name='logout'),
    path('check/', check.as_view(), name='check'),
    path('follow/', follow.as_view(), name='follow'),
    path('search/', search.as_view(), name='search'),
    path('recom/', recom.as_view() , name='recom'),
    path('is_follow/', is_follow.as_view() , name='is_follow')
]
