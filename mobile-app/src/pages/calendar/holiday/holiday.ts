import {NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {CalendarEvent} from 'angular-calendar';
import {WorldHoliday} from "../../../app/dictionary/WorldHoliday";
import {TranslateService} from "@ngx-translate/core";

@Component({
    templateUrl: 'holiday.html'
})
export class HolidayPage {

    date: Date;
    events: CalendarEvent[];
    worldHolidays: WorldHoliday;
    locale: String;

    constructor(public platform: Platform,
                private navParams: NavParams,
                public translateService: TranslateService) {
        this.date = navParams.get('date');
        this.events = navParams.get('events');
        this.worldHolidays = new WorldHoliday(this.date);
        this.locale = translateService.currentLang;
    }

    swipeHoliday($event): void {
        if (Math.abs($event.deltaX) < 100) {
            return;
        }
        if ($event.deltaX < 0) {
           this.worldHolidays.next();

        } else {
            this.worldHolidays.previous();
        }
    }

    holidaySrc(): String {
        return "assets/imgs/world-holiday/" + this.worldHolidays.current().title.toLowerCase() + ".jpg";
    }

}