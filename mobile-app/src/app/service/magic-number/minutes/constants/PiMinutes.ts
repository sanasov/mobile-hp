import HolidayEvent from "../../../../domain/holiday-event";
import {HolidayType} from "../../../../dictionary/holidayType";
import {MagicNumberMinutes} from "../MagicNumberMinutes";

export class PiMinutes extends MagicNumberMinutes {

    constructor(public holidayEvent: HolidayEvent) {
        super(holidayEvent);
    }

    public numbers(year: number): number[] {
        return  [314159, 3141592, 31415926];
    }

    public holidayType(): HolidayType {
        return HolidayType.PI;
    }
}
