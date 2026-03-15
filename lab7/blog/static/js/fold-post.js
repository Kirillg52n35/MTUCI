document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, ищем кнопки сворачивания");
    
    // Находим все кнопки с классом 'fold-button'
    var foldBtns = document.getElementsByClassName('fold-button');
    console.log("Найдено кнопок:", foldBtns.length);
    
    // Добавляем обработчик для каждой кнопки
    for (var i = 0; i < foldBtns.length; i++) {
        foldBtns[i].addEventListener('click', function(event) {
            var button = event.target;
            var post = button.closest('.one-post');
            
            if (post) {
                // Переключаем класс 'folded' у поста
                post.classList.toggle('folded');
                
                // Меняем текст кнопки
                if (post.classList.contains('folded')) {
                    button.innerHTML = 'развернуть';
                    console.log("Пост свернут");
                } else {
                    button.innerHTML = 'свернуть';
                    console.log("Пост развернут");
                }
            }
        });
    }
});