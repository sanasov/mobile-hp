import * as moment from "moment";

export default class HolidayEvent {
    private _title: String;
    private _date: Date;
    private _notifyDate: Date;


    constructor(_title: String, _date: Date, _notifyDate: Date) {
        this._title = _title;
        this._date = _date;
        this._notifyDate = _notifyDate;
    }

    get title(): String {
        return this._title;
    }


    get date(): Date {
        return new Date(this._date);
    }

    get dateString(): string {
        if (!this._date) {
            return "";
        }
        return moment(this._date).format('YYYY-MM-DD');
    }

    get notifyDate(): Date {
        return new Date(this._date);
    }

    get notifyDateString(): string {
        if (!this._notifyDate) {
            return "";
        }
        return moment(this._notifyDate).format('YYYY-MM-DD');
    }

    set title(title: String) {
        this._title = title;
    }

    set date(date: Date) {
        this._date = date;
    }

    set dateString(date: string) {
        this._date = moment(date, "YYYY-MM-DD").toDate();
    }

    set notifyDate(notifyDate: Date) {
        this._notifyDate = notifyDate;
    }

    set notifyDateString(notifyDate: string) {
        this._notifyDate = moment(notifyDate, "YYYY-MM-DD").toDate();
    }

    public static create(event: HolidayEvent) {
        if (event._title || event._date || event._notifyDate) {
            return new HolidayEvent(event._title, new Date(event._date), new Date(event._notifyDate)); // ios
        }
        return new HolidayEvent(event.title,  new Date(event.date), new Date(event.notifyDate)); // android
    }

    toJSON() {
        return {
            title: this._title,
            date: this._date,
            notifyDate: this._notifyDate,
        };
    }

}
