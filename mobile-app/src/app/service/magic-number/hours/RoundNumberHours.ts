import HolidayEvent from "../../../domain/holiday-event";
import {MagicNumberHours} from "./MagicNumberHours";
import {RoundNumberCalculation} from "../RoundNumberCalculation";

export class RoundNumberHours extends MagicNumberHours {
  delta: number;

  constructor(public holidayEvent: HolidayEvent) {
    super(holidayEvent);
    this.delta = 10000;
  }

  public numbers(year: number): number[] {
    return new RoundNumberCalculation(this.holidayEvent.date, this.delta, this.diff).numbers(year);
  }

}
