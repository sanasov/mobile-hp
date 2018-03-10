import {MagicNumber} from "../MagicNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";
import HolidayEvent from "../../../domain/holiday-event";
import {TimeMeasure} from "../../../dictionary/timeMeasure";

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

    public description(): string {
        return "HOURS_HAVE_PASSED";
    }

    public birthdayDescription(): string {
        return "TODAY_YOU_TURNED_HOURS";
    }

    public holidayDate(date1: Date, daysAmount: number): Date {
        return MagicNumberUtils.calcDateByHours(date1, daysAmount);
    }


    public timeMeasureType(): TimeMeasure {
        return TimeMeasure.HOUR;
    }

}
