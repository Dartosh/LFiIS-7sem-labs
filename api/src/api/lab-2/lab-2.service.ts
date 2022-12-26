import { Lab2Repository } from "./lab-2.repository.js";

export class Lab2Service {
    private readonly lab2Repository: Lab2Repository;

    constructor(lab2Repository: Lab2Repository) {
        this.lab2Repository = lab2Repository;
    }
}