from django.urls import path
from .views import *

urlpatterns = [
    path("<int:dumb>/",RoomView.as_view()),
]