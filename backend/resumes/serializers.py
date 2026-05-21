from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = [
            "id",
            "title",
            "file",
            "file_size",
            "match_score",
            "download_count",
            "uploaded_at",
        ]
        read_only_fields = [
            "id",
            "file_url",
            "file_size",
            "match_score",
            "download_count",
            "uploaded_at",
        ]
    
    def get_file_url(self, obj):
        request = self.context.get("request")

        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        
        return None


