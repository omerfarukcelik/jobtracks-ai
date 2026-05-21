from rest_framework import serializers
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Resume
from .serializers import ResumeSerializer

class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user).order_by("-uploaded_at")
    
    def perform_create(self, serializer):
        uploaded_file = self.request.FILES.get("file")

        serializer.save(
            user=self.request.user,
            file_size=uploaded_file.size if uploaded_file else 0
        )

        @action(detail=False, methods=["get"])
        def stats(self, request):
            resumes = self.get_queryset()

            total_resumes = resumes.count()

            best_match_score = 0
            if resumes.exists():
                best_match_score = max(resume.match_score for resume in resumes)

            total_downloads = sum(resume.download_count for resume in resumes)

            return Response({
                "total_resumes": total_resumes,
                "best_match_score": best_match_score,
                "total_downloads": total_downloads,
            })
