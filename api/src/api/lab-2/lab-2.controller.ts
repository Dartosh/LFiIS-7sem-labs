import { Lab2Service } from "./lab-2.service.js";

export class Lab2Controller {
    private readonly lab2Service: Lab2Service;

    constructor(lab2Service: Lab2Service) {
        this.lab2Service = lab2Service;
    }
}
