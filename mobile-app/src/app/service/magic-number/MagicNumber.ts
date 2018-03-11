import HolidayEvent from "../../domain/holiday-event";
import HappyHoliday from "../../domain/happy-holiday";
import {TimeMeasure} from "../../dictionary/timeMeasure";
import {HolidayType} from "../../dictionary/holidayType";

export abstract class MagicNumber {

    constructor(public holidayEvent: HolidayEvent) {
    }


    public happyHolidays(hpEvent: HolidayEvent, year: number): HappyHoliday[] {
        return this.numbers(year)
            .map(roundNumber => new HappyHoliday("event", this.title(), this.description(roundNumber), this.holidayDate(hpEvent.date, roundNumber), 2, hpEvent.id, roundNumber, this.timeMeasureType()));
    }

    public birthdayHolidays(birthday: Date, year: number): HappyHoliday[] {
        return this.numbers(year)
            .map(roundNumber => new HappyHoliday("birthday", this.birthdayTitle(), this.birthdayDescription(), this.holidayDate(birthday, roundNumber), 1, 0, roundNumber, this.timeMeasureType()));
    }

    abstract numbers(year: number): number[];

    abstract diff(date1, date2): number;

    abstract timeMeasureType(): TimeMeasure;

    abstract holidayType(): HolidayType;

    title(): string {
        return this.holidayEvent.title;
    }

    birthdayTitle(): string {
        return "";
    }

    abstract description(magicNumber: number): string;

    abstract birthdayDescription(): string;


    abstract holidayDate(date1, date2): Date;

}
