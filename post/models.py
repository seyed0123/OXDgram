from django.db import models



# Create your models here.

class post(models.Model):
    owner = models.CharField(max_length=15, null=False , default='admin')
    img = models.ImageField(upload_to='posts', blank=False, null=False)
    text = models.TextField(blank=True)

