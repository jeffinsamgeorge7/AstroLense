
from django.urls import path
from . import views

app_name = 'App_Login'
urlpatterns = [
   path('signup/',views.new_one,name='new_one'),
   path('hello',views.sign_up,name='signup'),
   path('signin/',views.login_page,name='signin'),
   path('',views.SignupPage,name='signup'),
   path('login/',views.LoginPage,name='login'),
   path('home/',views.HomePage,name='home'),
   path('logout/',views.LogoutPage,name='logout'),
   
]
