import { FuzzySet } from "./classes/fuzzy-set.class.js";
import { ApplyRuleDto } from "./interfaces/apply-rule.dto.js";
import { TextDto } from "./interfaces/text.dto.js";
import { Rule } from "./classes/rule.class.js";
import { Lab1Repository } from "./lab-1.repository.js";

export class Lab1Service {
    private readonly lab1Repository: Lab1Repository;

    constructor(lab1Repository: Lab1Repository) {
        this.lab1Repository = lab1Repository;
    }

    public getFuzzyForVariables(names: (string | undefined)[], fuzzy: number[], values: string[]) {
        names.forEach((name, index) => {
            const fuzzyValue = (+values[index]);
            fuzzy.push(fuzzyValue);
        });
    }

    public readSetsAndCreateRules(expression: TextDto) {
        if (expression.text !== this.lab1Repository.getPrevExpression()) {
            this.lab1Repository.resetRepository();

            this.lab1Repository.setPrevExpression(expression.text);

            const names = this.lab1Repository.getNames();
            const sets = this.lab1Repository.getSets();
            const rules = this.lab1Repository.getRules();

            this.readSets(names, sets, expression.text);

            this.createRules(sets, rules);

            return {
                rules: rules.map((rule) => ({
                    premise: rule.premise,
                    conclusion: rule.conclusion,
                    names: rule.premise.getElementsNames(),
                })),
            };
        }
    }

    public readSets(names: string[], sets: Array<FuzzySet>, expression: string) {
        const expressions = expression.trim().split('\n');
    
        expressions.forEach((subExpression) => {
            const separatorIndex = subExpression.indexOf('=');
    
            if (separatorIndex === -1) {
                throw new Error('Separator not found');
            }
    
            const name = subExpression.split('=')[0];
            const value = subExpression.split('=')[1];
    
            if (name.length > 1 || name < 'A' || name > 'Z') {
                throw new Error('Wrong input format');
            }
    
            const fuzzySet = new FuzzySet(name);
            fuzzySet.setFromString(value)
    
            names.push(name);
            sets.push(fuzzySet);
        });
    }

    public createRules(sets: Array<FuzzySet>, rules: Array<Rule>) {
        sets.forEach((outer) => {
            sets.forEach((inner) => {
                rules.push(new Rule(outer, inner));
            });
        });
    }

    public applyRule(ruleProps: ApplyRuleDto) {
        const rule = this.lab1Repository.getRules()[ruleProps.index];
    
        const premise = rule.getPremise();
        const names = premise.getElementsNames();
    
        const fuzzy = new Array<number>();
    
        this.getFuzzyForVariables(names, fuzzy, ruleProps.values);
    
        console.log(fuzzy);
    
        const enteredFuzzySet = new FuzzySet();
        enteredFuzzySet.setByNames(names, fuzzy);
    
        const conclusion = rule.applyTo(enteredFuzzySet)
    
        return {
            header: rule.getHeader(),
            entered: enteredFuzzySet.toString(),
            conclusion: conclusion.toString(),
        }
    }
}