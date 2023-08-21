from django.db import models
from person.models import person

_person = person()
# Create your models here.

class post(models.Model):
    owner = models.CharField(max_length=15, null=False, default='0')
    img = models.ImageField(upload_to='posts', blank=False, null=False)
    text = models.TextField(blank=True)

