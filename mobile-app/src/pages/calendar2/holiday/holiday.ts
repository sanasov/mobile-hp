import {NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {CalendarHolidaySlider} from "../../../app/service/CalendarHolidaySlider";
import HappyHoliday from "../../../app/domain/happy-holiday";

@Component({
    templateUrl: 'holiday.html'
})
export class HolidayPage {

    date: Date;
    holidaySlider: CalendarHolidaySlider;
    locale: String;

    constructor(public platform: Platform,
                private navParams: NavParams,
                public translateService: TranslateService) {
        this.date = navParams.get('date');
        this.holidaySlider = new CalendarHolidaySlider(this.date, translateService);
        this.locale = translateService.currentLang;
    }

    swipeHoliday($event): void {
        if (Math.abs($event.deltaX) < 100) {
            return;
        }
        if ($event.deltaX < 0) {
           this.holidaySlider.next();

        } else {
            this.holidaySlider.previous();
        }
    }

}