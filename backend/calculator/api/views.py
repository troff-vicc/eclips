# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models import Way
from .serializers import WaySerializer


class WayViewSet(viewsets.ModelViewSet):
    queryset = Way.objects.all()
    serializer_class = WaySerializer
    
    # Добавляем кастомное действие для проверки направлений
    @action(detail=False, methods=['post'])
    def check_eligible(self, request):
        """
        Проверяет, на какие направления проходит абитуриент
        POST /api/calc/check_eligible/
        """
        try:
            # Получаем минимальный требуемый общий балл из запроса
            required_total_score = request.data.get('body', 0)
            
            if not required_total_score:
                return Response({
                    'error': 'Поле "body" с минимальным общим баллом обязательно'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Находим все направления, где минимальный балл <= переданному баллу
            eligible_directions = Way.objects.filter(body__lte=required_total_score)
            
            # Сериализуем результат
            serializer = WaySerializer(eligible_directions, many=True)
            
            return Response({
                'eligible_directions': serializer.data,
                'total_count': len(eligible_directions),
                'user_score': required_total_score
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)