import HolidayEvent from "../../../../domain/holiday-event";
import {MagicNumberDays} from "../MagicNumberDays";
import {HolidayType} from "../../../../dictionary/holidayType";

export class PiDays extends MagicNumberDays {

    constructor(public holidayEvent: HolidayEvent) {
        super(holidayEvent);
    }

    public numbers(year: number): number[] {
        return [3141, 31415];
    }

    public holidayType(): HolidayType {
        return HolidayType.PI;
    }
}
