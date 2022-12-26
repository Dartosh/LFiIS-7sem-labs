// Лабораторная работа 4 по дисциплине ЛОИС
// Выполнена студентами группы 921702 БГУИР
// Клинцов А.О., Нестеров Е.В., Кирилушкин А.Г., Гетманская В.Е .
// Вариант 22 - Реализовать прямой нечеткий логический вывод, используея импликацию Гогена
// 10.10.2022
// Использованные материалы:
// "Прикладные нечеткие системы" Т.Тэрано, К.Асаи, М.Сугэно
// Методическое пособие по курсу "Логические основы интеллектуальных систем"

import express from 'express';
import cors from 'cors';
import appRouter from './api/app.router.js';

const app = express();
const port = 8080;

app.use(express.json({ strict: false }));
app.use(cors());


app.use('/', appRouter);

app.listen(port, () => {
    console.log('\x1b[32m', `[server]: Server is running at https://localhost:${port}`);
});
