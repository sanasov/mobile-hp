import * as moment from "moment";
import {holidayColors} from "../dictionary/holidayColors";
import {CalendarEvent} from "angular-calendar";
import {ILocalNotification} from "@ionic-native/local-notifications";

export default class HappyHoliday {
    private _id: string;
    private _eventId: number;
    private _title: string;
    private _description: string;
    private _date: Date;
    private _priority: number;
    private _imgSrc: string;

    constructor(_id: string, _title: string, _description: string, _date: Date, _priority: number, _eventId: number) {
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

    get eventId(): number {
        return this._eventId;
    }

    get imgSrc(): string {
        if (this._imgSrc) {
            return this._imgSrc;
        }
        if (this._priority >= 3) {
            this._imgSrc = "assets/imgs/world-holiday/" + this._id.toLowerCase() + ".jpg";
        } else {
            this._imgSrc = "assets/imgs/" + this._id.toLowerCase() + "/" + this.randomInt(1, 3) + ".jpg";
        }
        return this._imgSrc;
    }

    set priority(_priority: number) {
        this._priority = _priority;
    }

    set eventId(_eventId: number) {
        this._eventId = _eventId;
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
            return new HappyHoliday(holiday._id, holiday._title, holiday._description, new Date(holiday._date), holiday._priority, holiday._eventId); // ios
        }
        return new HappyHoliday(holiday.id, holiday.title, holiday.description, new Date(holiday.date), holiday.priority, holiday.eventId); // android
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    toJSON() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            date: this._date,
            priority: this._priority,
            eventId: this._eventId
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

    public toILocalNotification(id: number): ILocalNotification {
        return {
            id: id,
            title: this.title,
            text: this.description,
            at: this.date
        }
    }

}
