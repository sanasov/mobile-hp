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

    public description(magicNumber: number): string {
        return magicNumber + " days have passed";
    }

    public birthdayDescription(magicNumber: number): string {
        return "Today you turned " + magicNumber + " days"
    }

    public holidayDate(date1: Date, daysAmount: number): Date {
        return MagicNumberUtils.calcDateByDays(date1, daysAmount);
    }

}
