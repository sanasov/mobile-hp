import {_} from 'underscore'
import HappyHoliday from "../domain/happy-holiday";
import {WorldHoliday} from "../dictionary/WorldHoliday";
import {TranslateService} from "@ngx-translate/core";

export class CalendarHolidaySlider {

    private currentHolidays: Array<HappyHoliday>;

    constructor(private date: Date, private translateService: TranslateService) {
        this.date = date;
        this.currentHolidays = [new WorldHoliday(date, translateService).get()];
    }

    current(): HappyHoliday {
        return this.currentHolidays[0];
    }

    previous(): void {

    }

    next(): void {

    }

}