from djongo import models
from django import forms

class Notice(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    view = models.PositiveIntegerField(default=0, editable=False)

    def __str__(self):
        return self.title

class Opinion(models.Model):
    writer = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    score = models.PositiveSmallIntegerField()
    pro = models.PositiveSmallIntegerField(default=0)
    con = models.PositiveSmallIntegerField(default=0)
    archetype = models.TextField()