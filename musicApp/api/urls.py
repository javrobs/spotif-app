from django.urls import path
from .views import *

urlpatterns = [
    path("room/",RoomView.as_view()),
    path("create-room/",CreateRoomView.as_view())
]