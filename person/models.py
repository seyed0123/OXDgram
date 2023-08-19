from django.db import models


# Create your models here.
class person(models.Model):
    username = models.CharField(max_length=15, null=False, unique=True)
    boi = models.TextField(blank=True)
    name = models.CharField(max_length=20, default='')
    profile_img = models.ImageField(upload_to='profile', default='default-profile.jpg')
    banner_img = models.ImageField(upload_to='banner', default='default_banner.jpg')
    password = models.CharField(max_length=15)
    email = models.EmailField()
    can_follow = models.BooleanField()
    can_comment = models.BooleanField()
    can_search = models.BooleanField()
