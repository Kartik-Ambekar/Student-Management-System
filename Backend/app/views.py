from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.files.storage import default_storage
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from app.models import Students
from app.serializers import StudentSerializer
from django.db import connection
from django.http import JsonResponse

@csrf_exempt
def StudentAPI(request, pk=''):
    if request.method == 'GET':
        students = Students.objects.all()
        student_serializer = StudentSerializer(students, many=True)
        return JsonResponse(student_serializer.data, safe=False)
    elif request.method == 'POST':
        student_data = JSONParser().parse(request)
        student_serializer = StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Student Added Successfully", safe=False)
        return JsonResponse("Failed To Add Student", safe=False)
    elif request.method == 'DELETE':
        try:
            student = Students.objects.get(universityid = pk)
            student.delete()
            return HttpResponse("Student Deleted Successfully")
        except Students.DoesNotExist:
            return HttpResponse("Student Not Found", status=404)

def SingleStudentAPI(request, email=''):
    if request.method == 'GET':
        if email:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM Students WHERE email = %s", [email])
                row = cursor.fetchone()
                if row:
                    student_data = {
                        'universityid':row[0],
                        'fname' :row[1], 
                        'lname':row[2],
                        'phnumber':row[3],
                        'email':row[4],
                        'year':row[5],
                        'department':row[6],
                        'feesamount':row[7],
                        'feesstatus':row[8],
                        'examresult':row[9],
                        'attendance':row[10]
                    }
                    return JsonResponse(student_data)
                else:
                    return JsonResponse({'error': 'Student not found'}, status=404)
        else: 
            return JsonResponse({'error': 'Email not provided'}, status=400)

# Create your views here.
def index(request):
    return HttpResponse("hello")
