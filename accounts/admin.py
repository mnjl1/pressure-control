from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email',)
    list_filter = ('email', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'metric')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        # ('Personal', {'fields': ('about',)}),
    )
    # formfield_overrides = {
    #     models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    # }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(CustomUser, UserAdminConfig)
