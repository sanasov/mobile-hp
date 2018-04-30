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
        if (!this._birth || isNaN(this._birth.getTime())) {
            return new Date();
        }
        return new Date(this._birth);
    }

    get birthString(): string {
        if (!this.birth) {
            return "";
        }
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
        console.log(moment(birth, "YYYY-MM-DD"));
        this._birth = moment(birth, "YYYY-MM-DD").toDate();
    }

    public static create(user: User) {
        if (user._firstName || user._lastName || user._birth) {
            return new User(user._firstName, user._lastName, new Date(user._birth)); // ios
        }
        return new User(user.firstName, user.lastName, new Date(user.birth)); // android
    }

    toJSON() {
        return {
            firstName: this._firstName,
            lastName: this._lastName,
            birth: this._birth,
        };
    }

}
