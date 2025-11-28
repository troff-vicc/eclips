from django.db import models

# Create your models here


class Way(models.Model):
    title = models.CharField(max_length=200)
    
    russion = models.IntegerField()
    math = models.IntegerField()
    prof_math = models.IntegerField()
    phys = models.IntegerField()
    inf = models.IntegerField()
    chem = models.IntegerField()
    bio = models.IntegerField()
    hist = models.IntegerField()
    soc = models.IntegerField()
    lit = models.IntegerField()
    eng = models.IntegerField()
    
    body = models.TextField()

    def __str__(self):
        return f"Way: {self.title}"
