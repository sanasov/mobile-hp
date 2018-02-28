import HolidayEvent from "../../../domain/holiday-event";
import {MagicNumberMinutes} from "./MagicNumberMinutes";
import {RoundNumberCalculation} from "../RoundNumberCalculation";

export class RoundNumberMinutes extends MagicNumberMinutes {
  delta: number;

  constructor(public holidayEvent: HolidayEvent) {
    super(holidayEvent);
    this.delta = 1000000;
  }

  public numbers(year: number): number[] {
    return new RoundNumberCalculation(this.holidayEvent.date,  this.delta, this.diff).numbers(year);
  }
}
