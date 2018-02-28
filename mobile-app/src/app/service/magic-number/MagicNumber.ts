import HolidayEvent from "../../domain/holiday-event";
import HappyHoliday from "../../domain/happy-holiday";

export abstract class  MagicNumber {

  constructor(public holidayEvent: HolidayEvent) {
  }


  public happyHolidays(hpEvent: HolidayEvent, year: number): HappyHoliday[] {
    return this.numbers(year)
      .map(roundNumber => new HappyHoliday(this.title(roundNumber), this.holidayDate(hpEvent.date, roundNumber)));
  }

  public birthdayHolidays(birthday: Date, year: number): HappyHoliday[] {
    return this.numbers(year)
      .map(roundNumber => new HappyHoliday(this.birthDayTitle(roundNumber), this.holidayDate(birthday, roundNumber)));
  }

   abstract numbers(year: number): number[];

   abstract diff(date1, date2): number;

   abstract title(magicNumber: number): string;

   abstract birthDayTitle(magicNumber: number): string;

   abstract holidayDate(date1, date2): Date;

}
