import {MagicNumber} from "./MagicNumber";
import HolidayEvent from "../../domain/holiday-event";
import {MagicNumberUtils} from "./MagicNumberUtils";

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
            return "Passed 1 year";
        } else {
            return magicNumber + " years have passed";
        }
    }

    public birthdayDescription(magicNumber: number): string {
        return "Happy birthday!!!"
    }

    public holidayDate(date1: Date, yearsAmount: number): Date {
        return MagicNumberUtils.calcDateByYears(date1, yearsAmount);
    }

}
