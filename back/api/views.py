from django.shortcuts import render, redirect

from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Notice, Opinion
from .forms import OpinionForm
from .serializers import NoticeSerializer, OpinionSerializer

import logging

logger = logging.getLogger(__name__)

class NoticeListView(generics.ListAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer

class NoticeDetailView(generics.RetrieveAPIView):
    serializer_class = NoticeSerializer

    def get_queryset(self):
        add_view = Notice.objects.get(id=self.kwargs['pk'])
        add_view.view += 1
        add_view.save()

        return Notice.objects.filter(id=self.kwargs['pk'])

class OpinionView(APIView):
    def get(self, request, obj):
        queryset = Opinion.objects.filter(subject=self.kwargs['obj'])
        serializers_class = OpinionSerializer

        return Response(queryset)

    def post(self, request):
        opinion = OpinionForm()

        logger.warn(opinion)

        serializer = OpinionSerializer(opinion, data=request.data)

        logger.warn(serializer)

        if not serializer.is_valid():
            return serializer.errors

        serializer.save()

        return redirect('OpinionView', request='GET')