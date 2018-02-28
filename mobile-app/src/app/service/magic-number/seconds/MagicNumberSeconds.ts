import {MagicNumber} from "../MagicNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";
import HolidayEvent from "../../../domain/holiday-event";

export class MagicNumberSeconds extends MagicNumber {

  constructor(public holidayEvent: HolidayEvent) {
    super(holidayEvent);
  }

  public numbers(year: number): number[] {
    return [];
  }

  public diff(date1, date2): number {
    return MagicNumberUtils.diffSeconds(date1, date2);
  };

  public title(magicNumber: number): string {
    return this.holidayEvent.title+". \n" + magicNumber + " seconds have passed";
  }

  public birthDayTitle(magicNumber: number): string {
    return "Today you turned " + magicNumber + " seconds"
  }
  public holidayDate(date1: Date, daysAmount: number): Date {
    return MagicNumberUtils.calcDateBySeconds(date1, daysAmount);
  }

}
