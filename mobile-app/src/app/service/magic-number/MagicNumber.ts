import HolidayEvent from "../../domain/holiday-event";
import HappyHoliday from "../../domain/happy-holiday";

export abstract class MagicNumber {

    constructor(public holidayEvent: HolidayEvent) {
    }


    public happyHolidays(hpEvent: HolidayEvent, year: number): HappyHoliday[] {
        return this.numbers(year)
            .map(roundNumber => new HappyHoliday("birthday", this.title(), this.description(roundNumber), this.holidayDate(hpEvent.date, roundNumber), 2, hpEvent.id));
    }

    public birthdayHolidays(birthday: Date, year: number): HappyHoliday[] {
        return this.numbers(year)
            .map(roundNumber => new HappyHoliday("birthday", this.birthdayTitle(), this.birthdayDescription(roundNumber), this.holidayDate(birthday, roundNumber), 1, 0));
    }

    abstract numbers(year: number): number[];

    abstract diff(date1, date2): number;

    title(): string {
        return this.holidayEvent.title;
    }

    birthdayTitle(): string {
        return "May your birthday be full of happy!"
    }

    abstract description(magicNumber: number): string;

    abstract birthdayDescription(magicNumber: number): string;


    abstract holidayDate(date1, date2): Date;

}
