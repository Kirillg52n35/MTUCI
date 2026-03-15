from django.shortcuts import render, get_object_or_404, redirect
from django.http import Http404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Article

def user_login(request):
    if request.method == "POST":
        # Получаем данные из формы
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Проверяем, что поля не пустые
        if username and password:
            # Аутентификация пользователя
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                # Если пользователь существует и пароль верный
                login(request, user)
                return redirect('archive')  # Перенаправляем на главную
            else:
                # Если данные неверные
                return render(request, 'login.html', 
                             {'error': 'Неверный логин или пароль'})
        else:
            return render(request, 'login.html', 
                         {'error': 'Заполните все поля'})
    else:
        return render(request, 'login.html')

def user_logout(request):
    logout(request)
    return redirect('archive')

def user_register(request):
    if request.method == "POST":
        # Получаем данные из формы
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        
        # Проверяем, что поля не пустые
        if not (username and email and password and password2):
            return render(request, 'register.html', 
                         {'error': 'Заполните все поля'})
        
        # Проверяем, что пароли совпадают
        if password != password2:
            return render(request, 'register.html', 
                         {'error': 'Пароли не совпадают'})
        
        # Проверяем, что пользователь с таким именем не существует
        if User.objects.filter(username=username).exists():
            return render(request, 'register.html', 
                         {'error': 'Пользователь с таким именем уже существует'})
        
        # Проверяем, что email не занят
        if User.objects.filter(email=email).exists():
            return render(request, 'register.html', 
                         {'error': 'Пользователь с таким email уже существует'})
        
        # Создаем нового пользователя
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            # Сразу авторизуем пользователя
            login(request, user)
            return redirect('archive')
        except Exception as e:
            return render(request, 'register.html', 
                         {'error': f'Ошибка при регистрации: {str(e)}'})
    else:
        return render(request, 'register.html')

def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})

def get_article(request, article_id):
    post = get_object_or_404(Article, id=article_id)
    return render(request, 'article.html', {"post": post})

def create_post(request):
    if request.user.is_anonymous:
        # Вместо 404 отправляем на страницу входа с сообщением
        return render(request, 'login.html', 
                     {'error': 'Чтобы создать статью, нужно авторизоваться'})
    
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