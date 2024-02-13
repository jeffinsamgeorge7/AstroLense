from django.shortcuts import render
from django.shortcuts import HttpResponseRedirect
from django.urls import reverse

def index(request):
    return render(request, 'main.html',context={})
 
#def index(request):
#     return HttpResponseRedirect(reverse('App_Logo:new_one'))