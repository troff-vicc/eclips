from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from ..models import Way
from .serializers import WaySerializer, CalculatorInputSerializer


class WayViewSet(viewsets.ModelViewSet):
    queryset = Way.objects.all()
    serializer_class = WaySerializer
    
    @action(detail=False, methods=['post'])
    def calculate(self, request):
        serializer = CalculatorInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        extra_points = data.get('extra_points', 0)
        
        # Создаем базовый запрос
        query = Q()
        
        # Список всех предметов
        subjects = [
            'russion', 'math', 'prof_math', 'phys', 'inf',
            'chem', 'bio', 'hist', 'soc', 'lit', 'eng'
        ]
        
        # Фильтруем по каждому предмету
        for subject in subjects:
            user_score = data.get(subject, 0) or 0  # Если None, то 0
            
            # Ищем направления, где минимальный балл по предмету <= пользовательскому баллу
            # ИЛИ предмет не требуется (минимальный балл = 0)
            subject_query = Q(**{f'{subject}__lte': user_score}) | Q(**{f'{subject}': 0})
            query &= subject_query
        
        # Применяем фильтр по предметам
        possible_ways = Way.objects.filter(query)
        
        # Рассчитываем общую сумму баллов пользователя
        total_user_score = sum(
            score for score in [
                data.get('russion', 0) or 0,
                data.get('math', 0) or 0,
                data.get('prof_math', 0) or 0,
                data.get('phys', 0) or 0,
                data.get('inf', 0) or 0,
                data.get('chem', 0) or 0,
                data.get('bio', 0) or 0,
                data.get('hist', 0) or 0,
                data.get('soc', 0) or 0,
                data.get('lit', 0) or 0,
                data.get('eng', 0) or 0
            ]
        ) + extra_points
        
        # Фильтруем по минимальному проходному баллу И по каждому предмету
        final_ways = []
        for way in possible_ways:
            # Проверяем, проходит ли пользователь по общему баллу
            if total_user_score >= way.min_total_score:
                # Дополнительная проверка по каждому предмету
                passes_all_subjects = True
                required_subjects = []
                
                for subject in subjects:
                    way_min_score = getattr(way, subject)
                    user_subject_score = data.get(subject, 0) or 0
                    
                    # Если предмет требуется (минимальный балл > 0)
                    if way_min_score > 0:
                        required_subjects.append({
                            'subject': subject,
                            'required': way_min_score,
                            'user_score': user_subject_score,
                            'passed': user_subject_score >= way_min_score
                        })
                        
                        if user_subject_score < way_min_score:
                            passes_all_subjects = False
                
                if passes_all_subjects:
                    way_data = WaySerializer(way).data
                    way_data['user_total_score'] = total_user_score
                    way_data['required_total_score'] = way.min_total_score
                    way_data['required_subjects'] = required_subjects
                    final_ways.append(way_data)
        
        return Response({
            'user_total_score': total_user_score,
            'possible_ways': final_ways,
            'total_found': len(final_ways)
        })