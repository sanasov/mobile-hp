import {NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {WorldHoliday} from "../../../app/dictionary/WorldHoliday";
import HappyHoliday from "../../../app/domain/happy-holiday";

@Component({
    templateUrl: 'holiday.html'
})
export class HolidayPage {

    private date: Date;
    private locale: String;
    private holidays: HappyHoliday[] = [];

    constructor(public platform: Platform,
                private navParams: NavParams,
                public translateService: TranslateService) {
        this.date = navParams.get('date');
        this.holidays = this.getHolidays().filter(h => h);
        console.log(JSON.stringify(this.holidays));
        this.locale = translateService.currentLang;
    }

    getHolidays(): HappyHoliday[] {
        const worldHoliday = new WorldHoliday(this.date, this.translateService).get();
        const customHolidays = this.navParams.get('customHolidays');
        return customHolidays.concat(worldHoliday);
    }

}