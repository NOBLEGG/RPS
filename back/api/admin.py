from django.contrib import admin
from .models import Notice, CardRelic

from jsonfield import JSONField
from jsoneditor.forms import JSONEditor

admin.site.register(Notice);

@admin.register(CardRelic)
class CardRelicAdmin(admin.ModelAdmin):
    formfield_overrides = {
        JSONField: { 'widget': JSONEditor },
    }
#    list_display = ('eng_name', 'name')
#    list_filter = ('subject', 'rarity', 'kind')