from django.db import models

# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=255)
    email = models.EmailField()
    password=models.CharField(max_length=255)
    phone = models.CharField(max_length=255)

    def __str__(self): 

        return f'{self.first_name}'