import HolidayEvent from "../../../../domain/holiday-event";
import {HolidayType} from "../../../../dictionary/holidayType";
import {MagicNumberHours} from "../MagicNumberHours";

export class PiHours extends MagicNumberHours {

    constructor(public holidayEvent: HolidayEvent) {
        super(holidayEvent);
    }

    public numbers(year: number): number[] {
        return  [31415, 314159, 3141592];
    }

    public holidayType(): HolidayType {
        return HolidayType.PI;
    }
}
