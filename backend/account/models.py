from django.db import models

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
    


