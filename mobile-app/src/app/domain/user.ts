// import * as moment from 'moment';

import * as moment from "moment";

export default class User {
    private _firstName: String;
    private _lastName: String;
    private _birth: Date;


    constructor(_firstName: String, _lastName: String, _birth: Date) {
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._birth = _birth;
    }

    get fullName(): String {
        return this._firstName + " " + this._lastName;
    }

    get firstName(): String {
        return this._firstName;
    }

    get lastName(): String {
        return this._lastName;
    }

    get birth(): Date {
        return this._birth;
    }

    get birthString(): string {
        return moment(this._birth).format('YYYY-MM-DD');
    }

    set firstName(firstName: String) {
        this._firstName = firstName;
    }

    set lastName(lastName: String) {
        this._lastName = lastName;
    }

    set birth(birth: Date) {
        this._birth = birth;
    }

    set birthString(birth: string) {
        this._birth = new Date(birth);
    }

    static create(user: User) {
        return new User(user._firstName, user._lastName, new Date(user._birth));
    }

    toJSON() {
        return {
            firstName: this._firstName,
            lastName: this._lastName,
            birth: this._birth,
        };
    }

}
