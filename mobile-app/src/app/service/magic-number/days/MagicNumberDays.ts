import {MagicNumber} from "../MagicNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";
import HolidayEvent from "../../../domain/holiday-event";

export class MagicNumberDays extends MagicNumber {

    constructor(public holidayEvent: HolidayEvent) {
        super(holidayEvent);
    }

    public numbers(year: number): number[] {
        return [];
    }

    public diff(date1, date2): number {
        return MagicNumberUtils.diffDays(date1, date2);
    };

    public description(): string {
        return "DAYS_HAVE_PASSED";
    }

    public birthdayDescription(): string {
        return "TODAY_YOU_TURNED_DAYS"
    }

    public holidayDate(date1: Date, daysAmount: number): Date {
        return MagicNumberUtils.calcDateByDays(date1, daysAmount);
    }

}
