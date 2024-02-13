from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Userprofile(models.Model):
    profile_pic= models.ImageField(upload_to='profile_pics')
    user = models.OneToOneField(User,related_name='user_proflie' ,on_delete=models.CASCADE)