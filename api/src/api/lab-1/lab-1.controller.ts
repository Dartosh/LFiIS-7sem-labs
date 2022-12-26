import { ApplyRuleDto } from './interfaces/apply-rule.dto.js';
import { TextDto } from './interfaces/text.dto.js';
import { Lab1Service } from './lab-1.service.js';

export class Lab1Controller {
    private readonly lab1Service: Lab1Service;

    constructor(lab1Service: Lab1Service) {
        this.lab1Service = lab1Service;
    }

    public readSetsAndCreateRules(expression: TextDto) {
        return this.lab1Service.readSetsAndCreateRules(expression);
    }

    public applyRule(applyRuleBody: ApplyRuleDto) {
        return this.lab1Service.applyRule(applyRuleBody);
    }
}
