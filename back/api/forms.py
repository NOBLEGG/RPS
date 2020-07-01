from django import forms
from .models import Opinion

class OpinionForm(forms.Form):
    writer = forms.CharField(max_length=20)
    content = forms.CharField(widget=forms.Textarea)
    score = forms.FloatField()