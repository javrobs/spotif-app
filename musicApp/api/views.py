from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Room
from .serializer import RoomSerializer, CreateRoomSerializer
# Create your views here.

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    print("hello!!")
    def post(self, request, format=None):  
        print("hello?")
        print(self.request.session)
        print("sessionkey",self.request.session.session_key)
        if not self.request.session.session_key:
            self.request.session.create()
        print("data",request.data)
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            print('serializer was valid',guest_can_pause,votes_to_skip,host)
            try:
                room = Room.objects.get(host=host)
                response_status = status.HTTP_200_OK
            except Room.DoesNotExist:
                room = Room(host=host)
                response_status = status.HTTP_202_OK
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save()
            return Response(RoomSerializer(room).data, status=response_status)
            queryset = Room.objects.filter(host=host)
            print('queryset found',queryset.exists())
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room), status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'},status=status.HTTP_400_BAD_REQUEST)