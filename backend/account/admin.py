from django.contrib import admin
from .models import Person,Exoplanet,User,Fitsupload
# Register your models here.
"""from myapp.models import Author

admin.site.register(Author)
"""

admin.site.register(Person)
admin.site.register(Exoplanet)
admin.site.register(User)
admin.site.register(Fitsupload)