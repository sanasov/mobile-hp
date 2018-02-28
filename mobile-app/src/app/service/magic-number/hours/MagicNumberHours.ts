import {MagicNumber} from "../MagicNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";
import HolidayEvent from "../../../domain/holiday-event";

export class MagicNumberHours extends MagicNumber {

  constructor(public holidayEvent: HolidayEvent) {
    super(holidayEvent);
  }

  public numbers(year: number): number[] {
    return [];
  }

  public diff(date1, date2): number {
    return MagicNumberUtils.diffHours(date1, date2);
  };

  public title(): string {
    return "hours";
  }

  public birthDayTitle(): string {
    return "birthday in hours"
  }

  public holidayDate(date1: Date, daysAmount: number): Date {
    return MagicNumberUtils.calcDateByHours(date1, daysAmount);
  }

}
