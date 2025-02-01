from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'companies', views.CompanyViewSet)
# router.register(r'products', views.ProductViewSet)
# router.register(r'inventory', views.InventoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]