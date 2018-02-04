import {CalendarEvent} from 'angular-calendar';
import {holidayColors} from "./holidayColors";
import {_} from 'underscore'

export class WorldHoliday {
    static holidays: Array<{ title: string, date: string }> = [
        {title: "ARCHAEOLOGIST", date: "15.08"},
        {title: "BLONDE", date: "31.05"},
        {title: "BOSS", date: "16.10"},
        {title: "CHOCOLATE", date: "11.07"},
        {title: "CHRISTMAS", date: "25.12"},
        {title: "CHRISTMAS", date: "7.01"},
        {title: "FAMILY", date: "15.05"},
        {title: "FOOTBALL", date: "10.12"},
        {title: "FRIENDS", date: "30.07"},
        {title: "HALLOWEEN", date: "31.10"},
        {title: "HUGS", date: "21.01"},
        {title: "KIT", date: "19.02"},
        {title: "LAUGHT", date: "11.04"},
        {title: "MEN", date: "19.11"},
        {title: "MOUNTIN", date: "11.12"},
        {title: "MOVIE", date: "28.12"},
        {title: "MUSEUM", date: "18.05"},
        {title: "NOTABAK", date: "31.05"},
        {title: "NURSE", date: "12.05"},
        {title: "PI", date: "14.03"},
        {title: "POLOTENCE", date: "25.05"},
        {title: "ROCK_N_ROLL", date: "13.04"},
        {title: "SLEEPCAT", date: "1.03"},
        {title: "SUN", date: "3.05"}
    ];
    date: Date;
    holiday: { title: string, date: Date }

    constructor(date: Date) {
        this.date = date;
        this.holiday = this.init();
    }

    private init(): { title: string, date: Date } {
        const dayMonth = WorldHoliday.toDayMonth(this.date);
        return WorldHoliday.holidays
            .filter(h => h.date === dayMonth)
            .map(h => {
                return {title: h.title, date: this.date}
            })[0];
    }

    current(): { title: string, date: Date } {
        return this.holiday || {title: "", date: null};
    }

    previous(): void {
        this.holiday = _.max(
            WorldHoliday.holidays
                .filter(h => WorldHoliday.toDate(h.date, this.date.getFullYear()) <= this.current().date && h.title !== this.holiday.title)
                .map(h => {
                        return {title: h.title, date: WorldHoliday.toDate(h.date, this.date.getFullYear())}
                    }
                ),
            (h) => h.date);
    }

    next(): void {
        this.holiday = _.min(
            WorldHoliday.holidays
                .filter(h => WorldHoliday.toDate(h.date, this.date.getFullYear()) >= this.current().date && h.title !== this.holiday.title)
                .map(h => {
                        return {title: h.title, date: WorldHoliday.toDate(h.date, this.date.getFullYear())}
                    }
                ),
            (h) => h.date);
    }

    static toDayMonth(date: Date): String {
        return date.getDate() + "." + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    }

    static toDate(dayMonth: String, year: number): Date {
        return new Date(year, +dayMonth.split(".")[1] - 1, +dayMonth.split(".")[0])
    }

    static toCalendarEvents(year: number): Array<CalendarEvent> {
        return WorldHoliday.holidays.map(holiday => {
            return {
                start: WorldHoliday.toDate(holiday.date, year),
                end: WorldHoliday.toDate(holiday.date, year),
                title: holiday.title,
                color: holidayColors.yellow,
                actions: null
            }
        });
    }
}