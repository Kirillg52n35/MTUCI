from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    title = models.CharField(max_length=200)  # заголовок статьи
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # автор (связь с пользователем)
    text = models.TextField()  # текст статьи
    created_date = models.DateField(auto_now_add=True)  # дата создания (автоматически)

    def __str__(self):
        return "%s: %s" % (self.author.username, self.title)

    def get_excerpt(self):
        """Возвращает первые 140 символов текста"""
        if len(self.text) > 140:
            return self.text[:140] + "..."
        else:
            return self.text
