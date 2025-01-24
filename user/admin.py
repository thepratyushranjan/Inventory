from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from user.models import User


class UserModelAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'email', 'name', 'tc', 'phone_no', 'address', 'is_admin', 'is_service_provider', 'is_active',)
    list_filter = ('is_admin', 'is_service_provider', 'is_active',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'phone_no', 'address', 'tc',)}),
        ('Permissions', {'fields': ('is_admin', 'is_service_provider', 'is_active',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'phone_no', 'address', 'tc', 'password1', 'password2', 'is_admin', 'is_service_provider', 'is_active'),
        }),
    )
    search_fields = ('email', 'name', 'phone_no', 'address',)
    ordering = ('email', 'id')
    filter_horizontal = ()

# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)