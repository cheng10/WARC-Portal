from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Document)
admin.site.register(WarcFile)
admin.site.register(Collection)
admin.site.register(TfIdf)