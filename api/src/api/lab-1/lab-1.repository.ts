import { FuzzySet } from "./classes/fuzzy-set.class.js";
import { Rule } from "./classes/rule.class.js";

export class Lab1Repository {
    private names = new Array<string>();
    private sets = new Array<FuzzySet>();
    private rules = new Array<Rule>();
    private prevExpression = '';

    constructor() {
        
    }

    public getNames() {
        return this.names;
    }

    public getSets() {
        return this.sets;
    }

    public getRules() {
        return this.rules;
    }

    public getPrevExpression() {
        return this.prevExpression;
    }

    public resetRepository() {
        this.names = new Array<string>();    
        this.sets = new Array<FuzzySet>();
        this.rules = new Array<Rule>();
    }

    public setPrevExpression(prevExpression: string) {
        this.prevExpression = prevExpression;
    }
}