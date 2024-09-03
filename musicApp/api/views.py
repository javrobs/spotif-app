from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializer import RoomSerializer
# Create your views here.

# def main(request,dumb:int):
#     return HttpResponse(f"Hi {dumb}")


# def main2(request,dumb:str):
#     return HttpResponse(f"Hello {dumb}")

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer