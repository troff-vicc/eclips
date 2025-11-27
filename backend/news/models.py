from django.db import models

# Create your models here.


class News(models.Model):
    title = models.CharField(max_length=200)
    img_path = models.CharField(max_length=200)
    body = models.TextField()

    def __str__(self):
        return f"News: {self.title}"