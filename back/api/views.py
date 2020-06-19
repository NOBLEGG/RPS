from rest_framework import generics, serializers

from .models import Notice
from .serializers import NoticeSerializer

class NoticeListView(generics.ListAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer

class NoticeDetailView(generics.RetrieveAPIView):
    serializer_class = NoticeSerializer

    def get_queryset(self):
        return Notice.objects.filter(id=self.kwargs['pk'])