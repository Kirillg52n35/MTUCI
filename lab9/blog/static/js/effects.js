$(document).ready(function() {
    console.log("Дополнительные эффекты загружены");
    
    // 1. Эффект появления статей при загрузке
    $('.one-post').each(function(index) {
        $(this).css('opacity', 0);
        $(this).delay(100 * index).animate({
            opacity: 1
        }, 500);
    });
    
    // 2. Эффект пульсации для кнопки "Новая статья"
    setInterval(function() {
        $('.new-post-btn, .menu-btn:contains("Новая статья")').effect('pulse', { times: 1 }, 1000);
    }, 5000);
    
    // 3. Подсказки для элементов
    $('.fold-button').each(function() {
        var originalText = $(this).text();
        $(this).attr('title', 'Нажмите, чтобы ' + originalText + ' статью');
    });
    
    $('.post-title a').attr('title', 'Перейти к полной версии статьи');
    
    // 4. Эффект для дат
    $('.article-created-date').each(function() {
        var dateText = $(this).text();
        $(this).prepend('📅 ');
    });
    
    // 5. Счетчик статей
    var postsCount = $('.one-post').length;
    if (postsCount > 0) {
        $('.archive').prepend('<div class="posts-counter">Всего статей: ' + postsCount + '</div>');
    }
    
    // 6. Подсветка постов
    $('.one-post:even').addClass('post-even');
    $('.one-post:odd').addClass('post-odd');
});