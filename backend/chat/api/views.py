from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
from ..gpt import GPTClient


class ChatViewSet(viewsets.ViewSet):
    """
    ViewSet для обработки чата с GPT
    """
    
    def __init__(self, *args, **kwargs):
        
        api_key = settings.API_KEY
        print(api_key)
        super().__init__(*args, **kwargs)
        # Инициализируем клиент GPT (вынесите API ключ в настройки)
        self.gpt_client = GPTClient(
            api_key=api_key
        )
    
    @action(detail=False, methods=['post'], url_path='send-message')
    def send_message(self, request):
        """
        Отправка сообщения GPT
        """
        try:
            message = request.data.get('message')
            model = request.data.get('model')  # опционально
            
            if not message:
                return Response(
                    {'error': 'Сообщение не может быть пустым'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Добавляем контекст для ВГУ
            context_message = f"""
            Ты - помощник для сайта Воронежского государственного университета (ВГУ).
            Отвечай на вопросы студентов, абитуриентов и сотрудников вежливо и информативно.

            Вопрос: {message}
            """
            
            # Отправляем сообщение в GPT
            if model:
                response_text = self.gpt_client.send_message(context_message, model=model)
            else:
                response_text = self.gpt_client.send_message(context_message)
            
            return Response({
                'success': True,
                'response': response_text,
                'user_message': message
            })
        
        except Exception as e:
            return Response(
                {'error': f'Ошибка при обработке запроса: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], url_path='health-check')
    def health_check(self, request):
        """
        Проверка работоспособности GPT сервиса
        """
        try:
            test_response = self.gpt_client.send_message("Тестовое сообщение")
            return Response({
                'status': 'GPT сервис работает нормально',
                'test_response': test_response[:50] + '...' if len(test_response) > 50 else test_response
            })
        except Exception as e:
            return Response(
                {'error': f'GPT сервис не доступен: {str(e)}'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )