from django.db import models



class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    # Add other fields as needed

    def __str__(self):
        return self.username

# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=255)
    email = models.EmailField()
    password=models.CharField(max_length=255)
    phone = models.CharField(max_length=255)

    def __str__(self): 

        return f'{self.first_name}'
    

# models.py

class Exoplanet(models.Model):
    pl_name = models.CharField(max_length=100)
    hostname = models.CharField(max_length=100)
    sy_snum = models.IntegerField()
    sy_pnum = models.IntegerField()
    discoverymethod = models.CharField(max_length=100)
    disc_year = models.IntegerField()

    def __str__(self): 

        return f'{self.pl_name }'
    



# models.py
from django.db import models

class ImageUpload(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/')



class Fitsupload(models.Model):
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='fits/')