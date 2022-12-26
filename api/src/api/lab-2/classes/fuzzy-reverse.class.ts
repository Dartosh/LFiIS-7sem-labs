// Лабораторная работа 4 по дисциплине ЛОИС
// Выполнена студентами группы 921702 БГУИР
// Клинцов А.О., Нестеров Е.В., Кирилушкин А.Г., Гетманская В.Е .
// Вариант 22 - Реализовать прямой нечеткий логический вывод, используея импликацию Гогена
// 10.10.2022
// Использованные материалы:
// "Прикладные нечеткие системы" Т.Тэрано, К.Асаи, М.Сугэно
// Методическое пособие по курсу "Логические основы интеллектуальных систем"

import { Pair } from "./pair.class.js";

export class FuzzyReverse {
    private arr = new Array<Pair>();
    private set: Pair;
    private fuzzySets = new Array<Pair>();
    private implMatrix = new Array<Array<Pair>>();
    private inputData = new Array<Pair>();

    public isValidSubstring(subString: string) {
        if (
            subString.length === 0 ||
            subString.indexOf(')') === -1 ||
            subString.indexOf(')') === -1 ||
            subString.indexOf(',') === -1 ||
            subString.indexOf(',') === -1
        ) {
            throw new Error('Wrong input format');
        }

        return true;
    }

    public isValidArrayValue(value: number) {
        if (value > 1 || value < 0) {
            throw new Error('Wrong input format');
        }

        return true;
    }

    public parseArrOutOfString(str: string) {
        let subString = str.substring(str.indexOf('=') + 2);

        const tempArray = new Array<Pair>();

        while (subString.length !== 0) {
            const startIndex = subString.indexOf('(');
            const endIndex = subString.indexOf(')');
            const commaIndex = subString.indexOf(',');

            const tempString = subString.substring(startIndex, endIndex);

            this.isValidSubstring(tempString);

            const arrayVariable = tempString.substring(startIndex + 1, commaIndex - startIndex - 1);

            const arrayValue = +tempString.substring(commaIndex + 1, endIndex - commaIndex);

            this.isValidArrayValue(arrayValue);

            tempArray.push(new Pair(arrayVariable, arrayValue));

            subString = subString.substring(endIndex + 2);
        }

        return tempArray;
    }

    public parseSetOutOfString(str: string) {
        const i = str.indexOf('=');

        const setName = str.substring(0, 1);

        const tempArr = this.parseArrOutOfString(str);

        return new Pair(setName, tempArr);
    }

    public parseArrOfMatrix(line: string) {
        const delimiter = '    ';

        let position = 0;

        let token: number;

        const tempArr = new Array();

        while ((position = line.indexOf(delimiter)) !== -1) {
            const stringToken = line.substring(0, position);

            token = +stringToken;

            tempArr.push(new Pair('-', token));
        }

        if (line.length >= 1) {
            token = +line;

            tempArr.push(new Pair('-', token));
        }

        return tempArr;
    }

    public parseInputForReverse(lines: Array<string>) {
        let isNextMatrix = false;

        // const currentSet = this.set;

        lines.forEach((line, index) => {
            if (line.indexOf('#') === 0) {
                isNextMatrix = false;

                if (this.set.second.length !== 0) {
                    this.inputData.push(new Pair(this.set.second, this.implMatrix));
                    this.implMatrix.length = 0;
                }
            } else if (line.indexOf('=') !== -1) {
                this.set = this.parseSetOutOfString(line);
            } else if (isNextMatrix) {
                this.implMatrix.push(this.parseArrOfMatrix(line));
            }
        });

        if (this.implMatrix.length != 0) {
            this.inputData.push(new Pair(this.set, this.implMatrix));
        }

        return this.inputData;
    }

    public showSet(toShow: Pair) {
        let string = `${toShow.first}={`;

        toShow.second.forEach((set: any, index: number) => {
            if (index !== 0) {
                string += ',';
            }

            string += `(${set.first},${set.second})`
        });

        string += '}\n';

        return string;
    }

    public showImplMatrix(matrix: Array<Array<Pair>>, num: number) {
        let string = `Matrix [${num}]:\n`;

        matrix.forEach((line, i) => {
            line.forEach((elem, j) => {
                const variable = matrix[i][j].first;
                const value = matrix[i][j].second;

                if (variable !== '') {
                    string += `${variable}:`;
                }

                string += '\t';
            });

            string += '\n';
        });

        string += '\n';

        return string;
    }

    public showReverseInput(data: Array<Pair>) {
        let string = '';

        data.forEach((pair, index) => {
            string += this.showSet(pair.first);
            string += this.showImplMatrix(pair.second, index);
        });

        return string;
    }

    public showChoosenReverseInput(data: Array<Pair>, index: number) {
        let string = '';

        string += this.showSet(data[index].first);
        string += this.showImplMatrix(data[index].second, index);

        return string;
    }

    public computeReverseComposition(array: Array<Pair>, matrix: Array<Array<Pair>>) {
        const solutions = new Array<Array<Array<Pair>>>();

        matrix[0].forEach((pair, j) => {
            const solutionForVariable = new Array<Array<Pair>>();

            matrix.forEach((line, k) => {
                const solution = new Array<Pair>();

                const isJColumnHasSolution = matrix[k][j].second >= array[j].second;

                if (!isJColumnHasSolution) {
                    return;
                }

                let lower = 0;
                let higher = 0;

                if (matrix[k][j].second === array[j].second) {
                    lower = array[j].second;
                    higher = 1;
                } else if (matrix[k][j].second > array[j].second) {
                    lower = array[j].second;
                    higher = array[j].second;
                }

                matrix.forEach((line, t) => {
                    if (t = k) {
                        solution.push(new Pair(lower, higher));

                        return;
                    }

                    const min = matrix[t][j].second >= array[j].second ? array[j].second : 1;

                    solution.push(new Pair(0, min));
                });

                solutionForVariable.push(solution);
            });

            solutions.push(solutionForVariable);
        });

        return solutions;
    }

    public computeActiualSolution(solutions: Array<Array<Array<Pair>>>) {
        const actualSolution = new Array<Array<Pair>>();

        for (let j = 0; j < solutions[0].length; j++) {
            solutions[0].forEach((solutionForVariable2, k) => {
                const solutionForColumn = new Array<Pair>();

                solutions[j][k].forEach((solution, t) => {
                    let lower = solutions[j][k][t].first;
                    let higher = solutions[j][k][t].second;

                    let solutionCounter = 0;

                    solutions.forEach((line, i) => {
                        for (let s = 0; s < line.length; s++) {
                            const lowerToBeCompared = solutions[i][s][t].first;
                            const higherToBeCompared = solutions[i][s][t].second;

                            if (lowerToBeCompared >= higher || lower <= higherToBeCompared) {
                                if (lower < lowerToBeCompared) {
                                    lower = lowerToBeCompared;
                                }
    
                                if (higher > higherToBeCompared) {
                                    higher = higherToBeCompared;
                                }
    
                                solutionCounter++;
                                break;
                            }
                        }
                    });

                    if (solutionCounter == solutions.length - 1) {
                        solutionForColumn.push(new Pair(lower, higher));
                    }
                });

                if (solutionForColumn.length == solutions[j][k].length) {
                    actualSolution.push(solutionForColumn);
                }
            });

            break;
        }

        return actualSolution;
    }

    public printSolutions(iSet: Pair, mCont: number, mergedSolutions: Array<Array<Pair>>) {
        let i = 0;

        let stringResult = 'Solution: (';

        while (i < mergedSolutions[0].length) {
            stringResult += `${iSet.first}${mCont}(x${i + 1})`;

            if (i + 1 !== mergedSolutions[0].length) {
                stringResult += ',';
            }

            i++;
        }

        stringResult += ')E';

        mergedSolutions.forEach((solution, i) => {
            stringResult += '(';

            solution.forEach((value, j) => {
                stringResult += '[';

                if (mergedSolutions[i][j].first == mergedSolutions[i][j].second) {
                    stringResult += `${mergedSolutions[i][j].first}`;
                } else {
                    stringResult += `${mergedSolutions[i][j].first},${mergedSolutions[i][j].second}`
                }

                stringResult += ']';

                if (j + 1 !== mergedSolutions[i].length) {
                    stringResult += 'x';
                }
            });

            stringResult += ')';

            if (i + 1 !== mergedSolutions.length) {
                stringResult += 'U';
            }
        });

        stringResult += '\n';

        return stringResult;
    }

    public printNoSolution(iSet: Pair, mCount: number) {
        return `${iSet.first}${mCount} has no solutions.\n`;
    }

    public isHasSolutions(arr: Array<Pair>, matrix: Array<Array<Pair>>) {
        const tempArray = new Array<number>();

        matrix[0].forEach(() => {
            tempArray.push(0);
        });

        matrix.forEach((line, i) => {
            matrix[0].forEach((elem, j) => {
                if (arr[j].second > matrix[i][j].second) {
                    tempArray[j]++;
                }
            });
        });

        tempArray.forEach((elem, i) => {
            
        });

        const condition = tempArray.some((elem, i) => {
            return tempArray[i] === matrix.length;
        })

        if (condition) {
            return false;
        }

        return true;
    }
}