import HolidayEvent from "../../../domain/holiday-event";
import {MagicNumberDays} from "./MagicNumberDays";
import {RoundNumberCalculation} from "../RoundNumberCalculation";

export class RoundNumberDays extends MagicNumberDays {
  delta: number;

  constructor(public holidayEvent: HolidayEvent) {
    super(holidayEvent);
    this.delta = 1000;
  }

  public numbers(year: number): number[] {
    return new RoundNumberCalculation(this.holidayEvent.date,  this.delta, this.diff).numbers(year);
  }

}
