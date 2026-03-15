console.log("=== Лабораторная работа №7 ===");
console.log("JavaScript загружен!");

var groupmates = [
    {
        "name": "Кирилл",
        "group": "2252",
        "age": 19,
        "marks": [4, 3, 5, 5, 4]
    },
    {
        "name": "Анна",
        "group": "2252",
        "age": 18,
        "marks": [3, 2, 3, 4, 3]
    },
    {
        "name": "Георгий",
        "group": "2252",
        "age": 19,
        "marks": [3, 5, 4, 3, 5]
    },
    {
        "name": "Валентина",
        "group": "2251",
        "age": 18,
        "marks": [5, 5, 5, 4, 5]
    }
];

function rpad(str, length) {
    str = str.toString();
    while (str.length < length) {
        str = str + ' ';
    }
    return str;
}

// Функция для вывода студентов в консоль
function printStudents(students) {
    console.log(
        rpad("Имя студента", 15),
        rpad("Группа", 8),
        rpad("Возраст", 8),
        rpad("Оценки", 20)
    );
    
    for (var i = 0; i < students.length; i++) {
        console.log(
            rpad(students[i]['name'], 15),
            rpad(students[i]['group'], 8),
            rpad(students[i]['age'], 8),
            rpad(students[i]['marks'], 20)
        );
    }
    console.log('\n');
}

// Выводим всех студентов
console.log("Все студенты:");
printStudents(groupmates);

// Функция фильтрации по группе
function filterByGroup(students, groupName) {
    var filtered = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i]['group'] === groupName) {
            filtered.push(students[i]);
        }
    }
    return filtered;
}

// Проверяем фильтрацию
console.log("Студенты группы 2252:");
var group1 = filterByGroup(groupmates, "2252");
printStudents(group1);

console.log("Студенты группы 2251:");
var group2 = filterByGroup(groupmates, "2251");