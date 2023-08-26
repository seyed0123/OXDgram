from django.urls import path
from .views import info
from .views import new
from .views import user_post
from .views import home_post

urlpatterns = [
    path('info/<int:post_id>/', info.as_view(), name='info'),
    path('new/', new.as_view(), name='new'),
    path('user/<int:user_id>/', user_post.as_view(), name='user_posts'),
    path('home/', home_post.as_view(), name='home_post')
]