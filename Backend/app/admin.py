from django.contrib import admin
from .models import Students
from .models import *

model_list = [Students]
admin.site.register(model_list)

# Register your models here.
