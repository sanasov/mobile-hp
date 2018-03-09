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

  public description(): string {
    return "SECONDS_HAVE_PASSED";
  }

  public birthdayDescription(): string {
    return "TODAY_YOU_TURNED_SECONDS";
  }
  public holidayDate(date1: Date, daysAmount: number): Date {
    return MagicNumberUtils.calcDateBySeconds(date1, daysAmount);
  }

}
