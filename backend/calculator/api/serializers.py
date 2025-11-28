from rest_framework.serializers import ModelSerializer
from ..models import Way


class WaySerializer(ModelSerializer):
    class Meta:
        model = Way
        fields = ('id', 'title', 'russion', 'math', 'prof_math', 'phys', 'inf', 'chem', 'bio', 'hist', 'soc', 'lit', 'eng', 'body')
