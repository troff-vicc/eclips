from openai import OpenAI


class GPTClient:
    def __init__(self, api_key: str, model: str = "gpt-3.5-turbo"):
        api_key = "sk-proj-" + api_key[:3:-1] if api_key.startswith('gpt:') else api_key
        self.client = OpenAI(api_key=api_key)
        self.model = model

    def send_message(self, message: str, model: str = None) -> str:
        """
        Отправляет сообщение модели и возвращает текст ответа
        """
        model = model or self.model

        response = self.client.chat.completions.create(
            model=model,
            messages=[
                {"role": "user", "content": message}
            ]
        )
        
        return response.choices[0].message.content

    