import {HappyHolidays} from "./magic-number/HappyHolidays";
import HolidayEvent from "../domain/holiday-event";
import * as _ from 'underscore';
import HappyHoliday from "../domain/happy-holiday";

export class HolidayService {


    constructor(private hEvent: HolidayEvent, private birthday: Date) {
    }

    /**
     *
     * @param {HolidayEvent} hEvent
     * @returns {HappyHoliday[]}
     */
    public happyHolidays(nextYearsAmount: number): HappyHoliday[] {
        let holidays = [];
        const startYear = this.hEvent.date <= new Date() ? new Date().getFullYear() : this.hEvent.date.getFullYear();
        for (let year = startYear; year <= startYear + nextYearsAmount; year++) {
            holidays = _.unique(
                holidays.concat(new HappyHolidays([this.hEvent], new Date(), year).getEventHolidays()),
                false,
                (hp) => hp.title + hp.description
            );
        }
        return holidays.filter(h => h.date >= new Date() && h.date >= this.hEvent.date);
    }

    public birthdayHolidays(nextYearsAmount: number): HappyHoliday[] {
        let holidays = [];
        const startYear = this.hEvent.date <= new Date() ? new Date().getFullYear() : this.hEvent.date.getFullYear();
        for (let year = startYear; year <= startYear + nextYearsAmount; year++) {
            holidays = _.unique(
                holidays.concat(new HappyHolidays([], this.birthday, year).getBirthdayHolidays()),
                false,
                (hp) => hp.title + hp.description
            );
        }
        return holidays.filter(h => h.date >= new Date() && h.date >= this.hEvent.date);
    }
}
