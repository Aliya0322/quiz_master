# Quiz Master

Интерактивная викторина с вопросами, таймером и сохранением результатов

## Функционал

- Выбор темы (подгрузка вопросов по категориям)
- Таймер на каждый вопрос (30 секунд)
- Проверка ответов с мгновенным фидбеком
- Подсчёт результатов (правильные/неправильные ответы, процент)
- Сохранение результатов в локальное хранилище

## Архитектура проекта
```
quizmaster/
│
├── plugins/ # Директория с плагинами (темами)
│ ├── history.js
│ ├── science.js
│ └──
…
│
├── src/
│ ├── core/ # Ядро приложения
│ │ ├── index.js # Точка входа
│ │ ├── engine.js # Логика проведения викторины
│ │ ├── ui.js # Ввод/вывод пользователя
│ │ └── storage.js # Локальное хранение результатов
│ │
│ ├── utils/ # Утилитарные модули
│ │ ├── logger.js
│ │ └── helpers.js
│ │
│ └── config.js # Конфигурация (настройки по умолчанию)
│
├── package.json
└── README.md
```

## Быстрый старт

Клонируйте репозиторий:
```bash
git clone https://github.com/Aliya0322/quiz_master.git
