import {NavController, NavParams, Platform} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import {CalendarEvent} from 'angular-calendar';
// import {WorldHoliday} from "../../../app/dictionary/worldHoliday";
@Component({
    templateUrl: 'holiday.html'
})
export class HolidayPage {

    date: Date;
    events: CalendarEvent[];
    holiday: String;

    constructor(public platform: Platform,
                public params: NavParams,
                private navParams: NavParams) {
        this.date = navParams.get('date');
        this.events = navParams.get('events');
        // this.holiday = new WorldHoliday(this.date).holiday();
    }

}