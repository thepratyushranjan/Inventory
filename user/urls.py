from django.urls import path

from user.views import (
    SendPasswordResetEmailView,
    UserChangePasswordView,
    UserLoginView,
    UserPasswordResetView,
    UserProfileView,
    UserRegistrationView,
    UserListView,
)

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("user-list/", UserListView.as_view(), name="user-list"),
    path("changepassword/", UserChangePasswordView.as_view(), name="changepassword"),
    path(
        "send-reset-password-email/",
        SendPasswordResetEmailView.as_view(),
        name="send-reset-password-email",
    ),
    path(
        "reset-password/<uid>/<token>/",
        UserPasswordResetView.as_view(),
        name="reset-password",
    ),
]
