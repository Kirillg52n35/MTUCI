from django.shortcuts import render, get_object_or_404, redirect
from django.http import Http404
from .models import Article

def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})

def get_article(request, article_id):
    post = get_object_or_404(Article, id=article_id)
    return render(request, 'article.html', {"post": post})

def create_post(request):
    if request.user.is_anonymous:
        raise Http404("Только авторизованные пользователи могут создавать статьи")
    
    if request.method == "POST":
        # Обработка отправленной формы
        form = {
            'text': request.POST.get('text', ''),
            'title': request.POST.get('title', '')
        }
        
        # Валидация
        if form['title'] and form['text']:
            # Проверка на уникальность названия
            if Article.objects.filter(title=form['title']).exists():
                form['errors'] = 'Статья с таким названием уже существует'
                return render(request, 'create_post.html', {'form': form})
            else:
                # Создание статьи
                article = Article.objects.create(
                    title=form['title'],
                    text=form['text'],
                    author=request.user
                )
                return redirect('get_article', article_id=article.id)
        else:
            form['errors'] = 'Не все поля заполнены'
            return render(request, 'create_post.html', {'form': form})
    else:
        # Просто показать пустую форму
        return render(request, 'create_post.html', {})