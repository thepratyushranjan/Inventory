import threading

from django.contrib.auth import (
    authenticate,
    get_user_model,
)

from user.permissions import (
    IsActiveUser,
    IsAdmin,
    IsServiceProvider,
)
from user.renderers import UserRenderer
from user.serializers import (
    SendPasswordResetEmailSerializer,
    UserChangePasswordSerializer,
    UserListSerializer,
    UserLoginSerializer,
    UserPasswordResetSerializer,
    UserProfileSerializer,
    UserRegistrationSerializer,
    UserUpdateSerializer,
)
from user.utils import send_registration_email
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


# Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# Registration View


class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        password = request.data.get("password")
        email_thread = threading.Thread(
            target=send_registration_email, args=(user, password)
        )
        email_thread.start()
        return Response(
            {"token": token, "msg": "Registration Successful"},
            status=status.HTTP_201_CREATED,
        )


# Login and Profle Update View


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get("email")
        password = serializer.data.get("password")
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response(
                {"token": token, "msg": "Login Success"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"errors": {"non_field_errors": ["Email or Password is not Valid"]}},
                status=status.HTTP_404_NOT_FOUND,
            )

    def put(self, request, format=None):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"msg": "User data updated successfully"},
            status=status.HTTP_200_OK,
        )


# Profile View


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Change password View


class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={"user": request.user}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Changed Successfully"}, status=status.HTTP_200_OK
        )


# Forgot Password


class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Reset link send. Please check your Email"},
            status=status.HTTP_200_OK,
        )


# Reset Password


class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={"uid": uid, "token": token}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Reset Successfully"}, status=status.HTTP_200_OK
        )


# All User List Data
class UserListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, format=None):
        User = get_user_model()
        queryset = User.objects.all()
        paginator = PageNumberPagination()
        paginator.page_size = request.query_params.get("page_size", 10)
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = UserListSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)


# Admin Dashboard


class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, format=None):
        # Admin-specific logic
        return Response(
            {"msg": "Welcome to the Admin Dashboard!"}, status=status.HTTP_200_OK
        )


# Service Dashboard


class ServiceProviderDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsServiceProvider]

    def get(self, request, format=None):
        # Service provider-specific logic
        return Response(
            {"msg": "Welcome to the Service Provider Dashboard!"},
            status=status.HTTP_200_OK,
        )


# Customer Dashboard


class CustomerDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsActiveUser]

    def get(self, request, format=None):
        # Customer-specific logic
        return Response(
            {"msg": "Welcome to the Customer Dashboard!"}, status=status.HTTP_200_OK
        )
