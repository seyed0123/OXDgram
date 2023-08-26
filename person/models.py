from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class person(models.Model):
    username = models.CharField(max_length=100, unique=True, default='test')
    boi = models.TextField(blank=True)
    name = models.CharField(max_length=20, default='')
    profile_img = models.ImageField(upload_to='profile', default='default-profile.jpg')
    banner_img = models.ImageField(upload_to='banner', default='default_banner.jpg')
    password = models.CharField(max_length=15)
    email = models.EmailField()
    can_follow = models.BooleanField()
    can_search = models.BooleanField()


class Follower(models.Model):
    follower = models.CharField(max_length=100)
    user = models.CharField(max_length=100)

    def __str__(self):
        return self.user
