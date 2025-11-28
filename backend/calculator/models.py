from django.db import models


class Way(models.Model):
    title = models.CharField(max_length=200)
    
    # Баллы по предметам (может быть None, если предмет не требуется)
    russion = models.IntegerField(null=True, blank=True)
    math = models.IntegerField(null=True, blank=True)
    prof_math = models.IntegerField(null=True, blank=True)
    phys = models.IntegerField(null=True, blank=True)
    inf = models.IntegerField(null=True, blank=True)
    chem = models.IntegerField(null=True, blank=True)
    bio = models.IntegerField(null=True, blank=True)
    hist = models.IntegerField(null=True, blank=True)
    soc = models.IntegerField(null=True, blank=True)
    lit = models.IntegerField(null=True, blank=True)
    eng = models.IntegerField(null=True, blank=True)
    
    # Минимальный проходной балл (не равен сумме предметов)
    min_total_score = models.IntegerField()
    
    # Дополнительная информация
    body = models.TextField()
    
    def __str__(self):
        return f"Way: {self.title}"