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
    last_login = models.DateTimeField('last login', null=True, blank=True)

    # Add the new fields
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Specify the username field
    USERNAME_FIELD = 'username'


class Follower(models.Model):
    follower = models.CharField(max_length=100)
    user = models.CharField(max_length=100)

    def __str__(self):
        return self.user
