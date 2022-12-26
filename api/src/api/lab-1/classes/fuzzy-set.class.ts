// Лабораторная работа 4 по дисциплине ЛОИС
// Выполнена студентами группы 921702 БГУИР
// Клинцов А.О., Нестеров Е.В., Кирилушкин А.Г., Гетманская В.Е .
// Вариант 22 - Реализовать прямой нечеткий логический вывод, используея импликацию Гогена
// 10.10.2022
// Использованные материалы:
// "Прикладные нечеткие системы" Т.Тэрано, К.Асаи, М.Сугэно
// Методическое пособие по курсу "Логические основы интеллектуальных систем"

import { FuzzySetElem } from "./fuzzy-set-elem.class.js";
import { SetElem } from "./set-elem.class.js";

export class FuzzySet {
    private name?: string;

    // private arr: Map<string, FuzzySetElem>;
    public arr2: Set<FuzzySetElem> = new Set<FuzzySetElem>();

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }

    public getElementsNames() {
        return [...this.arr2].map((el) => el.variable?.toString())
    }

    public getName() {
        return this.name;
    }

    public toString() {
        return `{${[...this.arr2].join(',')}}`
    }

    public setByNames(names: (string | undefined)[], fuzzy: number[]) {
        if (names.length != fuzzy.length) {
            throw new Error('Wrong input format');
        }

        console.log(names)
        console.log(fuzzy)

        names.forEach((name, index) => {
            const setElem = new SetElem(name!);
            this.arr2.add(new FuzzySetElem(setElem, fuzzy[index]));
        });
    }

    public setFromString(str: string) {
        if (str[0] !== '{' || str[str.length - 1] !== '}') {
            throw new Error('Wrong input format');
        }

        let value = str.substring(1, str.length - 1);

        while (true) {
            // console.log('Iteration...');

            let i = value.indexOf(')');

            if (i === -1) {
                throw new Error('Wrong input format');
            }

            i++;
            this.arr2.add(new FuzzySetElem().setFromString(value.substring(0, i)));

            // console.log(this.arr2);

            if (i + 1 >= value.length + 1) {
                break;
            }

            value = value.substring(i + 1);
        }
    }
}
