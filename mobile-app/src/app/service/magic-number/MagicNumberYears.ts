import {MagicNumber} from "./MagicNumber";
import HolidayEvent from "../../domain/holiday-event";
import {MagicNumberUtils} from "./MagicNumberUtils";
import {TimeMeasure} from "../../dictionary/timeMeasure";

export class MagicNumberYears extends MagicNumber {

    constructor(public holidayEvent: HolidayEvent) {
        super(holidayEvent);
    }

    public numbers(year: number): number[] {
        if (year > this.holidayEvent.date.getFullYear()) {
            return [year - this.holidayEvent.date.getFullYear()];
        }
        return [];
    }

    public diff(date1, date2): number {
        return null;
    };

    public description(magicNumber: number): string {
        if (magicNumber === 1) {
            return "PASSED_YEAR";
        } else {
            return "YEARS_HAVE_PASSED";
        }
    }

    public birthdayDescription(): string {
        return "HAPPY_BIRTHDAY";
    }

    public holidayDate(date1: Date, yearsAmount: number): Date {
        return MagicNumberUtils.calcDateByYears(date1, yearsAmount);
    }


    public timeMeasureType(): TimeMeasure {
        return TimeMeasure.YEAR;
    }

}
