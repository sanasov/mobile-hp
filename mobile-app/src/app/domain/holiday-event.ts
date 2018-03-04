import * as moment from "moment";

export default class HolidayEvent {
    private _id: number;
    private _title: string;
    private _date: Date;
    private _notifyDate: Date;
    private _magicEvent: boolean;


    constructor(_id: number, _title: string, _date: Date, _notifyDate: Date, _magicEvent: boolean) {
        this._id = _id;
        this._title = _title;
        this._date = _date;
        this._notifyDate = _notifyDate;
        this._magicEvent = _magicEvent;
    }

    get id(): number {
        return this._id;
    }


    get title(): string {
        return this._title;
    }


    get date(): Date {
        return new Date(this._date);
    }

    get magicEvent(): boolean {
        return this._magicEvent;
    }

    get dateString(): string {
        if (!this._date) {
            return "";
        }
        return moment(this._date).format('YYYY-MM-DD');
    }

    get notifyDate(): Date {
        return new Date(this._notifyDate);
    }

    get notifyDateString(): string {
        if (!this._notifyDate) {
            this._notifyDate = this._date;
            this._notifyDate.setHours(9);
            this._notifyDate.setMinutes(0);
            if (this.isPast()) {
                this._notifyDate.setFullYear(new Date().getFullYear());
            }
        }
        return moment(this._notifyDate).format('YYYY-MM-DDTHH:mm');
    }

    set id(id: number) {
        this._id = id;
    }

    set title(title: string) {
        this._title = title;
    }

    set magicEvent(magicEvent: boolean) {
        this._magicEvent = magicEvent;
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
        this._notifyDate = moment(notifyDate, "YYYY-MM-DDTHH:mm").toDate();
    }

    public isFuture(): boolean {
        return moment(this.date, "YYYY-MM-DD").isAfter(moment(this.today(), "YYYY-MM-DD"));
    }

    public isToday(): boolean {
        return moment(this.date, "YYYY-MM-DD").isSame(moment(this.today(), "YYYY-MM-DD"));
    }

    public isPast(): boolean {
        return !moment(this.date, "YYYY-MM-DD").isSameOrAfter(moment(this.today(), "YYYY-MM-DD"));
    }

    public today(): Date {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
    }

    public static create(event: HolidayEvent) {
        if (event._title || event._date || event._notifyDate) {
            return new HolidayEvent(event._id, event._title, new Date(event._date), new Date(event._notifyDate), event._magicEvent); // ios
        }
        return new HolidayEvent(event.id, event.title, new Date(event.date), new Date(event.notifyDate), event.magicEvent); // android
    }

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            date: this._date,
            notifyDate: this._notifyDate,
            magicEvent: this._magicEvent,
        };
    }

    changeNotifyDateToFutureEventDate(): void {
        if (this.isPast()) {
            return
        }
        this._notifyDate = this._date;
        this._notifyDate.setHours(9);
        this._notifyDate.setMinutes(0);
    }
}
