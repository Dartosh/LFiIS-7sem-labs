// Лабораторная работа 4 по дисциплине ЛОИС
// Выполнена студентами группы 921702 БГУИР
// Клинцов А.О., Нестеров Е.В., Кирилушкин А.Г., Гетманская В.Е .
// Вариант 22 - Реализовать прямой нечеткий логический вывод, используея импликацию Гогена
// 10.10.2022
// Использованные материалы:
// "Прикладные нечеткие системы" Т.Тэрано, К.Асаи, М.Сугэно
// Методическое пособие по курсу "Логические основы интеллектуальных систем"

import { SetElem } from "./set-elem.class.js";

export class FuzzySetElem {
    public variable: SetElem | undefined;
    public val: number | undefined;

    constructor(variable?: SetElem, val?: number) {
        if(variable && typeof val === 'number') {
            this.variable = variable;
            this.val = val;
        }
    }

    setFromString(str: string) {
        if (str[0] !== '(' || str[str.length - 1] !== ')') {
            throw new Error('Wrong input format');
        }

        const value = str.substring(1, str.length - 1);

        const commaIndex = value.indexOf(',');

        this.variable = new SetElem(value.substring(0, commaIndex));
        this.val = +value.substring(commaIndex + 1);

        if (this.val < 0 || this.val > 1) {
          throw new Error('Wrong input format');
        }

        return this;
    }

    public toString() {
        return `(${this.variable!.toString()},${this.val})`
    }

    public isEqual(el: FuzzySetElem) {
        return this.variable! < el.variable!;
    }
}