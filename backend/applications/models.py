from django.db import models
from django.conf import settings


class Application(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPLIED", "Applied"),
        ("INTERVIEW", "Interview"),
        ("REJECTED", "Rejected"),
        ("OFFER", "Offer"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    company = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    job_url = models.URLField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    location = models.CharField(max_length=255, blank=True)

    salary_range = models.CharField(max_length=100, blank=True)
        
    applied_at = models.DateField()
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.company} - {self.title}"