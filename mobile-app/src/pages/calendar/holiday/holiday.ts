import {NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {WorldHoliday} from "../../../app/dictionary/WorldHoliday";
import HappyHoliday from "../../../app/domain/happy-holiday";
import {Wishes} from "../../../app/dictionary/Wishes";
import * as _ from 'underscore';
import {TimeMeasure} from "../../../app/dictionary/timeMeasure";

@Component({
    templateUrl: 'holiday.html'
})
export class HolidayPage {

    private date: Date;
    private locale: string;
    private wish: string;
    private holidays: HappyHoliday[] = [];

    constructor(public platform: Platform,
                private navParams: NavParams,
                public translateService: TranslateService) {
        this.date = navParams.get('date');
        this.holidays = this.getHolidays().filter(h => h);
        console.log(JSON.stringify(this.holidays));
        this.locale = translateService.currentLang;
        this.initWish();
    }

    getHolidays(): HappyHoliday[] {
        const worldHoliday = new WorldHoliday(this.date, this.translateService).get();
        const customHolidays = _.unique(
            this.navParams.get('customHolidays'),
            false,
            (hp) => hp.title + hp.date
        );
        return customHolidays.concat(worldHoliday);
    }

    initWish(): void {
        if (this.holidays.filter(h => h.id === "birthday" && h.timeMeasureType === TimeMeasure.YEAR).length > 0) {
            this.wish = new Wishes(this.translateService.currentLang).getForAnnualHoliday();
        } else {
            this.wish = new Wishes(this.translateService.currentLang).getAny();
        }
    }

}