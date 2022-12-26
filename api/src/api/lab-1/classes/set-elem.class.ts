// Лабораторная работа 4 по дисциплине ЛОИС
// Выполнена студентами группы 921702 БГУИР
// Клинцов А.О., Нестеров Е.В., Кирилушкин А.Г., Гетманская В.Е .
// Вариант 22 - Реализовать прямой нечеткий логический вывод, используея импликацию Гогена
// 10.10.2022
// Использованные материалы:
// "Прикладные нечеткие системы" Т.Тэрано, К.Асаи, М.Сугэно
// Методическое пособие по курсу "Логические основы интеллектуальных систем"

export class SetElem {
    public ch: string;
    public num: number;

    constructor(str: string) {
        if (str[0] > 'z' || str[0] < 'a') {
            throw new Error('Wrong input format');
        }

        this.ch = str[0];

        const numStr = str.substring(1);

        if (numStr.length === 0) {
            this.num = -1;
        } else {
            this.num = +numStr;
        }
    }

    public toString() {
        if (this.num != -1) {
            return `${this.ch}${this.num}`;
        } else {
            return this.ch
        }
    }

    public isEqual(el: SetElem) {
        if (this.ch !== el.ch) {
            return this.ch < el.ch;
        } else {
            return this.num < el.num;
        }
    }
}