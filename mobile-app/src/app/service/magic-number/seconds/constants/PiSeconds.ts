import HolidayEvent from "../../../../domain/holiday-event";
import {HolidayType} from "../../../../dictionary/holidayType";
import {MagicNumberSeconds} from "../MagicNumberSeconds";

export class PiSeconds extends MagicNumberSeconds {

    constructor(public holidayEvent: HolidayEvent) {
        super(holidayEvent);
    }

    public numbers(year: number): number[] {
        return  [31415926, 314159265, 3141592653];
    }

    public holidayType(): HolidayType {
        return HolidayType.PI;
    }
}
