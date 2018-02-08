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

  toJSON() {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      birth: this._birth,
    };
  }
}
