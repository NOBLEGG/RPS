from django.contrib import admin
from .models import User, Notice, CardRelic

admin.site.register(User)
admin.site.register(Notice)

@admin.register(CardRelic)
class CardRelicAdmin(admin.ModelAdmin):
    list_display = ('eng_name', 'name')
    list_filter = ('subject', 'rarity', 'kind')
