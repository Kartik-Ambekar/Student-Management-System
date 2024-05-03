from rest_framework import fields,serializers
from app.models import *

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = ('universityid',
                  'fname', 
                  'lname',
                  'phnumber',
                  'email',
                  'year',
                  'department',
                  'feesamount',
                  'feesstatus',
                  'examresult',
                 )