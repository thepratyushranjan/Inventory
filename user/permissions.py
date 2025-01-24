from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow admins to access certain views.
    """

    def has_permission(self, request, view):
        return getattr(request.user, "is_admin", False)


class IsServiceProvider(permissions.BasePermission):
    """
    Custom permission to only allow service providers to access certain views.
    """

    def has_permission(self, request, view):
        # Allow if the user is an admin or a service provider
        return getattr(request.user, "is_admin", False) or getattr(
            request.user, "is_service_provider", False
        )


class IsActiveUser(permissions.BasePermission):
    """
    Custom permission to only allow active users to access certain views.
    """

    def has_permission(self, request, view):
        return request.user.is_active
