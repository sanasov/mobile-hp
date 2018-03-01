import * as moment from "moment";
import {holidayColors} from "../dictionary/holidayColors";
import {CalendarEvent} from "angular-calendar";

export default class HappyHoliday {
    private _id: string;
    private _title: string;
    private _description: string;
    private _date: Date;
    private _priority: number

    constructor(_id: string, _title: string, _description: string, _date: Date, _priority: number) {
        this._id = _id;
        this._title = _title;
        this._description = _description;
        this._date = _date;
        this._priority = _priority;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
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

    get priority(): number {
        return this._priority;
    }

    get imgSrc(): string {
        if (this._priority >= 3) {
            return "assets/imgs/world-holiday/" + this._id.toLowerCase() + ".jpg";
        }
    }

    set priority(_priority: number) {
        this._priority = _priority;
    }

    set id(id: string) {
        this._id = id;
    }

    set title(title: string) {
        this._title = title;
    }

    set description(description: string) {
        this._description = description;
    }

    set date(date: Date) {
        this._date = date;
    }

    set dateString(date: string) {
        this._date = moment(date, "YYYY-MM-DD").toDate();
    }

    public static create(holiday: HappyHoliday) {
        if (holiday._title || holiday._date) {
            return new HappyHoliday(holiday._id, holiday._title, holiday._description, new Date(holiday._date), holiday._priority); // ios
        }
        return new HappyHoliday(holiday.id, holiday.title, holiday.description, new Date(holiday.date), holiday.priority); // android
    }

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            date: this._date,
            priority: this._priority
        };
    }

    public toCalendarEvent(): CalendarEvent {
        return {
            start: this.date,
            end: this.date,
            title: this.title + " \n" + this.description,
            color: this.priority < 3 ? holidayColors.red : holidayColors.yellow,
            actions: null
        }
    }

}
