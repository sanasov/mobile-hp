import {NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {CalendarEvent} from 'angular-calendar';
import {WorldHoliday} from "../../../app/dictionary/WorldHoliday";

@Component({
    templateUrl: 'holiday.html'
})
export class HolidayPage {

    date: Date;
    events: CalendarEvent[];
    holiday: String;
    holidaySrc: String;

    constructor(public platform: Platform,
                public params: NavParams,
                private navParams: NavParams) {
        this.date = navParams.get('date');
        this.events = navParams.get('events');
        this.holiday = new WorldHoliday().get(this.date);
        this.holidaySrc = "assets/imgs/world-holiday/" + this.holiday.toLowerCase() + ".jpg";
    }

}