import {_} from 'underscore'
import HappyHoliday from "../domain/happy-holiday";

export class CalendarHolidaySlider {

    private currentHolidays: Array<HappyHoliday>;

    constructor(currentHolidays: Array<HappyHoliday>) {
        this.currentHolidays = currentHolidays

    }

    current(): HappyHoliday {
        return this.currentHolidays[0];
    }

    previous(): void {

    }

    next(): void {

    }

}