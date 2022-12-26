import { Lab1Controller } from "./lab-1/lab-1.controller.js";
import { Lab1Service } from "./lab-1/lab-1.service.js";
import { Lab1Repository } from "./lab-1/lab-1.repository.js";
import { Lab2Repository } from "./lab-2/lab-2.repository.js";
import { Lab2Service } from "./lab-2/lab-2.service.js";
import { Lab2Controller } from "./lab-2/lab-2.controller.js";

export class AppInjector {
    private readonly lab1Controller: Lab1Controller;
    private readonly lab1Service: Lab1Service;
    private readonly lab1Repository: Lab1Repository;

    private readonly lab2Controller: Lab2Controller;
    private readonly lab2Service: Lab2Service;
    private readonly lab2Repository: Lab2Repository;

    constructor() {
        this.lab1Repository = new Lab1Repository();
        this.lab1Service = new Lab1Service(this.lab1Repository);
        this.lab1Controller = new Lab1Controller(this.lab1Service);

        this.lab2Repository = new Lab2Repository();
        this.lab2Service = new Lab2Service(this.lab2Repository);
        this.lab2Controller = new Lab2Controller(this.lab2Service);
    }

    get getLab1Controller() {
        return this.lab1Controller;
    }

    get getLab2Controller() {
        return this.lab2Controller;
    }
}