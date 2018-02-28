import HolidayEvent from "../../domain/holiday-event";
import HappyHoliday from "../../domain/happy-holiday";

export abstract class  MagicNumber {

  constructor(public holidayEvent: HolidayEvent) {
  }


  public happyHolidays(hpEvent: HolidayEvent, year: number): HappyHoliday[] {
    return this.numbers(year)
      .map(roundNumber => new HappyHoliday(this.title(), this.holidayDate(hpEvent.date, roundNumber)));
  }

  public birthdayHolidays(hpEvent: HolidayEvent, year: number): HappyHoliday[] {
    return this.numbers(year)
      .map(roundNumber => new HappyHoliday(this.birthDayTitle(), this.holidayDate(hpEvent.date, roundNumber)));
  }

   abstract numbers(year: number): number[];

   abstract diff(date1, date2): number;

   abstract title(): string;

   abstract birthDayTitle(): string;

   abstract holidayDate(date1, date2): Date;

}
