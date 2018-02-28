import * as moment from "moment";
import {holidayColors} from "../dictionary/holidayColors";
import {CalendarEvent} from "angular-calendar";

export default class HappyHoliday {
    private _title: string;
    private _date: Date;


    constructor(_title: string, _date: Date) {
        this._title = _title;
        this._date = _date;
    }

    get title(): string {
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
    set title(title: string) {
      this._title = title;
    }

    set date(date: Date) {
        this._date = date;
    }

    set dateString(date: string) {
        this._date = moment(date, "YYYY-MM-DD").toDate();
    }

    public static create(holiday: HappyHoliday) {
        if (holiday._title || holiday._date) {
            return new HappyHoliday(holiday._title, new Date(holiday._date)); // ios
        }
        return new HappyHoliday(holiday.title,  new Date(holiday.date)); // android
    }

    toJSON() {
        return {
            title: this._title,
            date: this._date
        };
    }

    public toCalendarEvent() : CalendarEvent {
     return {
        start: this.date,
        end: this.date,
        title: this.title,
        color: holidayColors.red,
        actions: null
      }
    }

}
