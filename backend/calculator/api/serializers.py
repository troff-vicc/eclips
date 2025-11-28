from rest_framework import serializers
from ..models import Way

class WaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Way
        fields = '__all__'

class CalculatorInputSerializer(serializers.Serializer):
    russion = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    math = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    prof_math = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    phys = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    inf = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    chem = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    bio = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    hist = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    soc = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    lit = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    eng = serializers.IntegerField(min_value=0, max_value=100, required=False, allow_null=True)
    extra_points = serializers.IntegerField(min_value=0, max_value=10, default=0)