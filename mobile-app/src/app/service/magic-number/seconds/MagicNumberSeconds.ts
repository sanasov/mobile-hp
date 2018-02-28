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

  public title(): string {
    return "seconds";
  }

  public birthDayTitle(): string {
    return "birthday in seconds"
  }

  public holidayDate(date1: Date, daysAmount: number): Date {
    return MagicNumberUtils.calcDateBySeconds(date1, daysAmount);
  }

}
