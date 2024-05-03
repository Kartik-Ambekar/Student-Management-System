from django.contrib import admin
from django.urls import path
from app import views
from django.conf.urls import *
from django.urls.resolvers import URLPattern
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('',views.index, name='app'),
    path('students/',views.StudentAPI),
    path('students/<str:pk>/',views.StudentAPI),
    path('student/<str:email>/',views.SingleStudentAPI),

]
