from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    address = models.TextField(blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    license_no=models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name