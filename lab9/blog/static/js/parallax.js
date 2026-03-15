$(document).ready(function() {
    console.log("Параллакс инициализирован");
    
    // элементы для анимации
    var $parallaxIcons = $('.icon-for-parallax');
    var $window = $(window);
    
    // Начальные позиции
    var initialPositions = [];
    
    $parallaxIcons.each(function(index) {
        initialPositions[index] = {
            left: $(this).css('left'),
            bottom: $(this).css('bottom'),
            marginLeft: $(this).css('margin-left'),
            marginBottom: $(this).css('margin-bottom')
        };
    });
    
    // Функция обновления позиций при прокрутке
    function updateParallax() {
        // Получаем количество прокрученных пикселей
        var scrolled = $window.scrollTop();
        
        // Ограничиваем максимальную прокрутку для эффекта
        var maxScroll = 600;
        var progress = Math.min(scrolled / maxScroll, 1);
        
        // Обновляем позицию каждой иконки
        $parallaxIcons.each(function(index) {
            var $icon = $(this);
            
            // Разная скорость для каждой иконки
            // Чем выше индекс, тем медленнее движение
            var speedFactor = 0.15 * (index + 1);  // 0.15, 0.3, 0.45
            
            // Вычисляем смещение
            var moveY = scrolled * speedFactor;
            
            // Применяем трансформацию
            $icon.css({
                'transform': 'translateY(' + moveY + 'px)'
            });
            
            var moveX = scrolled * 0.05 * (index - 1);
            $icon.css({
                'margin-left': 'calc(' + initialPositions[index].marginLeft + ' + ' + moveX + 'px)'
            });
            
            // Уменьшаем прозрачность при прокрутке
            var opacity = Math.max(0.3 - progress * 0.2, 0.1);
            $icon.css('opacity', opacity);
        });
        
        // Дополнительный эффект для логотипа
        $('.header-content').css({
            'background': 'rgba(0, 0, 0, ' + (0.2 + progress * 0.1) + ')'
        });
    }
    
    // Запускаем при прокрутке
    $window.on('scroll', function() {
        requestAnimationFrame(updateParallax);
    });
    
    // Запускаем один раз для начальной позиции
    updateParallax();
    
    console.log("Параллакс эффект активирован");
});