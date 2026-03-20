Система планирования графика дежурств сотрудников

Веб‑приложение для планирования дежурств сотрудников и учёта результатов наблюдений (следов животных) в охраняемых зонах. Система поддерживает две роли пользователей (менеджер и сотрудник), работу с геозонами на карте, интеграцию с Google API и формирование отчётности в Google Docs.

Содержание
Функциональные возможности

Технологический стек

Архитектура проекта

Установка и запуск

Использование

Интеграция с Google API

API Endpoints

Структура базы данных

1. Функциональные возможности
Роли пользователей
Менеджер (пользователь manager / пароль 12345 — создаётся автоматически):

подтверждение регистрации новых пользователей;

назначение ролей (сотрудник);

создание и управление зонами дежурств (полигоны на карте);

назначение дежурств сотрудникам (дата, время, зона);

просмотр всех дежурств и результатов наблюдений;

формирование отчётов за период;

генерация отчётов в Google Docs с получением ссылки.

Сотрудник:

регистрация через Google OAuth;

авторизация через Google;

указание доступа к Google Calendar при регистрации;

просмотр своих дежурств;

фиксация результатов дежурства (следы/наблюдения) через Google Form (данные попадают в Google Sheets);

просмотр своих наблюдений (по данным из БД и Google Sheets).

Основные функции
Управление зонами: интерактивная карта (Mapbox) с возможностью добавления полигонов зон.

Календарь дежурств: назначение и просмотр дежурств по датам и сотрудникам.

Учёт наблюдений: хранение информации о следах/наблюдениях, привязанных к зонам и датам.

Отчётность: формирование отчётов за период в виде документа Google Docs.

Интеграция с Google: OAuth авторизация, Google Calendar (события дежурств), Google Sheets (результаты форм), Google Docs (отчёты).

2. Технологический стек
Backend
Node.js 18+

Express — веб‑фреймворк

MSSQL — основная СУБД

jsonwebtoken — JWT‑аутентификация

googleapis — работа с Google OAuth, Calendar, Sheets, Docs

node-fetch — HTTP‑запросы

dotenv — конфигурация через .env

Frontend
React (Create React App)

mapbox-gl — интерактивная карта

@mapbox/mapbox-gl-draw — рисование полигонов

Чистый CSS / простая верстка (панель управления)

Интеграции
Google OAuth 2.0 — аутентификация сотрудников

Google Calendar API — создание событий дежурств с напоминаниями

Google Sheets API — чтение результатов дежурств из Google Forms

Google Docs API — генерация отчётов

Mapbox — картографический сервис и полигоны зон

3. Архитектура проекта
Backend
server.js — точка входа, настройка Express, маршрутов и БД

config/db.js — подключение к MSSQL

config/google.js — настройка Google OAuth2 и сервисов

models/ — модели (User, DutyZone, DutyShift, Track)

routes/ — маршруты API (auth, users, zones, shifts, tracks, reports, map)

controllers/ — обработчики запросов

services/ — бизнес‑логика (Google Calendar, Sheets, Docs, Mapbox, отчёты)

Frontend
src/App.js — основная панель (навигация по модулям)

src/PendingUsers.jsx — подтверждение пользователей

src/Zones.jsx — список зон

src/MapPage.jsx — карта с полигонами

src/Shifts.jsx — дежурства

src/Tracks.jsx — результаты наблюдений

src/Reports.jsx — генерация отчётов
5. Использование
Вход в систему
Менеджер: создаётся автоматически (manager / 12345).

Сотрудник: авторизация через Google (кнопка “Войти через Google”).

Подтверждение сотрудников (менеджер)
Раздел “Ожидающие пользователи”

Просмотр списка

Подтверждение → пользователю присваивается роль “сотрудник”

Работа с зонами
Раздел “Зоны” — список зон

Раздел “Карта” — интерактивная карта

рисование полигона (Mapbox Draw)

сохранение зоны в БД и Mapbox Dataset

Назначение дежурств
Раздел “Дежурства”

Выбор сотрудника, зоны, даты и времени

При создании:

запись в MSSQL

создание события в Google Calendar

напоминания за 1 день и 1 час

Результаты дежурств
Сотрудник заполняет Google Form (настройка сохранения в Google Sheets)

Приложение читает данные из Google Sheets через API

В разделе “Следы” менеджер видит агрегированные данные

Формирование отчёта
Раздел “Отчёты”

Ввод параметров (период, таблица, диапазон, дата и т.п.)

Backend:

собирает данные из MSSQL и Google Sheets

создаёт документ в Google Docs

возвращает ID документа

Фронтенд показывает ID / ссылку на документ

6. Интеграция с Google API
Настройка Google Cloud
Создать проект в Google Cloud Console

Включить API:

Google OAuth 2.0

Google Calendar API

Google Sheets API

Google Docs API

Создать OAuth‑учётные данные:

Тип: Web application

Redirect URI: http://localhost:5000/api/auth/google/callback

Client ID и Client Secret добавить в .env

Функции интеграции
OAuth 2.0: вход через Google, сохранение refresh_token в БД

Google Calendar: создание событий дежурств с напоминаниями за 1 день и 1 час

Google Sheets: чтение данных из таблицы с результатами дежурств

Google Docs: генерация отчёта и возврат ID документа

7. API Endpoints (примерная структура)
Аутентификация / пользователи
GET /api/auth/google — редирект на Google OAuth

GET /api/auth/google/callback — приём кода, создание/поиск пользователя, выдача JWT

GET /api/users/pending — список неподтверждённых пользователей (менеджер)

POST /api/users/confirm/:id — подтверждение пользователя (менеджер)

Зоны
GET /api/zones — список зон

POST /api/zones — создание зоны

PUT /api/zones/:id — редактирование зоны

DELETE /api/zones/:id — удаление зоны

Карта / полигоны
GET /api/map/zones — GeoJSON зон

POST /api/map/zones — добавление полигона

DELETE /api/map/zones/:id — удаление полигона

Дежурства
GET /api/shifts — все дежурства (менеджер)

GET /api/shifts/my — дежурства текущего сотрудника

POST /api/shifts — создание дежурства (менеджер)

Результаты / следы
GET /api/tracks — список/агрегация наблюдений

(данные берутся из БД и/или Google Sheets)

Отчёты
POST /api/reports/daily — формирование отчёта за период, создание Google Docs, возврат ID

8. Структура базы данных (основные таблицы)
Users
Id — PK

Email

Password (может быть null при OAuth)

Role (manager / employee / none)

IsConfirmed (bit)

RefreshToken — для Google API

DutyZones
Id — PK

Name

Polygon — GeoJSON / текст

(опционально: описание, цвет и т.п.)

DutyShifts
Id — PK

UserId — FK → Users

ZoneId — FK → DutyZones

StartTime — datetime

EndTime — datetime

CalendarEventId — ID события в Google Calendar

Tracks (если храним часть данных у себя)
Id — PK

Date

ZoneId — FK → DutyZones

Animal / Type

Count
