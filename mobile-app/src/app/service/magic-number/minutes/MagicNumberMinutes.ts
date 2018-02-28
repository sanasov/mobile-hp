import {MagicNumber} from "../MagicNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";
import HolidayEvent from "../../../domain/holiday-event";

export class MagicNumberMinutes extends MagicNumber {

  constructor(public holidayEvent: HolidayEvent) {
    super(holidayEvent);
  }

  public numbers(year: number): number[] {
    return [];
  }

  public diff(date1, date2): number {
    return MagicNumberUtils.diffMinutes(date1, date2);
  };

  public title(magicNumber: number): string {
    return magicNumber + " minutes";
  }

  public birthDayTitle(magicNumber: number): string {
    return "Today you turned " + magicNumber + " minutes"
  }

  public holidayDate(date1: Date, daysAmount: number): Date {
    return MagicNumberUtils.calcDateByMinutes(date1, daysAmount);
  }

}
