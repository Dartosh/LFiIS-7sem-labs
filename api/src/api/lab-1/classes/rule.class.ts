// Лабораторная работа 4 по дисциплине ЛОИС
// Выполнена студентами группы 921702 БГУИР
// Клинцов А.О., Нестеров Е.В., Кирилушкин А.Г., Гетманская В.Е .
// Вариант 22 - Реализовать прямой нечеткий логический вывод, используея импликацию Гогена
// 10.10.2022
// Использованные материалы:
// "Прикладные нечеткие системы" Т.Тэрано, К.Асаи, М.Сугэно
// Методическое пособие по курсу "Логические основы интеллектуальных систем"

import { FuzzySetElem } from "./fuzzy-set-elem.class.js";
import { FuzzySet } from "./fuzzy-set.class.js";

export class Rule {
    public premise: FuzzySet;
    public conclusion: FuzzySet;
    private values: number[][];

    constructor(premise: FuzzySet, conclusion: FuzzySet) {
        this.premise = premise;
        this.conclusion = conclusion;
        this.values = new Array<number[]>(/*premise.arr2.size*/);

        [...this.conclusion.arr2].forEach((el1, i) => {
            const tempArr = new Array<number>(/*conclusion.arr2.size*/);

            [...conclusion.arr2].forEach((el2, j) => {
                tempArr.push((el1.val! <= el2.val!) ? 1 : el2.val! / el1.val!);
            });

            this.values.push(tempArr);
        })
    }

    public getPremise(): FuzzySet {
        return this.premise;
    }

    public applyTo(set: FuzzySet): FuzzySet {
        console.log([...this.conclusion.arr2]);
        console.log([...set.arr2]);
        console.log(this.values);
        const answer = new FuzzySet();

        [...this.conclusion.arr2].forEach((el2, i) => {
            let val = 0;

            [...set.arr2].forEach((fromSet, j) => {
                if (this.values[j]) {
                    val = Math.max(val, fromSet.val! * (this.values[j][i]));
                }
            });

            answer.arr2.add(new FuzzySetElem(el2.variable, val));
        })

        return answer;
    }

    public getHeader(): string {
        return `${this.premise.getName()}~>${this.conclusion.getName()}`;
    }
}