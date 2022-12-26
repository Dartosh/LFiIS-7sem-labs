export class Pair {
    private _name: any;
    private _value: any;

    constructor(name: any, value: any) {
        this._name = name;
        this._value = value;
    }

    get first() {
        return this._name;
    }

    get second() {
        return this._value;
    }
}