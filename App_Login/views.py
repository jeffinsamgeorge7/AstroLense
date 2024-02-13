from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from App_Login.forms import SignupForm
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout

# Create your views here.
def new_one(request):
    return render(request, 'App_Login/new.html',context={})
"""
def sign_up(request):
    form = UserCreationForm()
    registered =False
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            form.save()
            registered = True
            
    return render(request, 'App_Login/signup.html')   
"""
def login_page(request):
    form = AuthenticationForm()
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username= username, password=password)
            if user is not None:
                login(request,user)
                return HttpResponseRedirect(reverse('index')) 
            
    return render(request,'App_Login/login.html',context={'form':form})           


def sign_up(request):
    form = SignupForm()
    registered = False
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            form.save()
            registered = True
            
    dict = { 'form': form, 'registered': registered}
    return render(request, 'App_Login/signup.html',context=dict)     

@login_required(login_url='login')
def HomePage(request):
    return render (request,'App_Login/newhome.html')

def SignupPage(request):
    if request.method=='POST':
        uname=request.POST.get('username')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')

        if pass1!=pass2:
            return HttpResponse("Your password and confrom password are not Same!!")
        else:

            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
            return redirect('App_Login:login')
        



    return render (request,'App_Login/newsignup.html')

def LoginPage(request):
    if request.method=='POST':
        username=request.POST.get('username')
        pass1=request.POST.get('pass')
        user=authenticate(request,username=username,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            return HttpResponse ("Username or Password is incorrect!!!")

    return render (request,'App_Login/newlogin.html')


def Login_page(request):
    form = AuthenticationForm()
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username= username, password=password)
            if user is not None:
                login(request,user)
                return redirect('home')
                #return HttpResponseRedirect(reverse('home')) 
                #return HttpResponse ("Username or Password is incorrect!!!")
            
    return render(request,'App_Login/newlogin.html',context={'form':form})   

def LogoutPage(request):
    logout(request)
    return redirect('login')