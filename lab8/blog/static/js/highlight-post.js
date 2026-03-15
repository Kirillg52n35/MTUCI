$(document).ready(function() {
    console.log("jQuery загружен, инициализация подсветки");
    
    // Добавляем тень для каждого поста
    $('.one-post').each(function() {
        // Проверяем, есть ли уже блок тени
        if ($(this).find('.one-post-shadow').length === 0) {
            $(this).append('<div class="one-post-shadow"></div>');
        }
    });
    
    // Эффект подсветки при наведении
    $('.one-post').hover(
        function() {
            // При наведении - показываем тень с анимацией
            $(this).find('.one-post-shadow').stop().animate({
                opacity: 0.3
            }, 200);
            console.log("Наведение на пост:", $(this).find('.post-title').text());
        },
        function() {
            // При уходе - скрываем тень
            $(this).find('.one-post-shadow').stop().animate({
                opacity: 0
            }, 200);
        }
    );
    
    // Эффект для логотипа - увеличение при наведении
    $('.header img').hover(
        function() {
            $(this).stop().animate({
                width: '70px',
                height: '70px'
            }, 300);
        },
        function() {
            $(this).stop().animate({
                width: '50px',
                height: '50px'
            }, 300);
        }
    );
    
    console.log("Эффекты подсветки активированы");
});