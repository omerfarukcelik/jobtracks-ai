from django.db import models
from django.conf import settings

class Resume(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resumes"
    )

    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="resumes/")

    file_size = models.PositiveIntegerField(default=0)
    match_score = models.PositiveIntegerField(default=0)
    download_count = models.PositiveIntegerField(default=0)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.user.email}"