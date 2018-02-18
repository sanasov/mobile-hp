import {Component, TemplateRef, ViewChild, NgZone} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {Subject} from "rxjs/Subject";
import {CommonSettings} from "../../app/service/CommonSettings";
import {HolidayPage} from "../calendar/holiday/holiday";
import {HolidayEngine} from "../../app/service/HolidayEngine";
import {CalendarEvent} from "angular-calendar";
import {WorldHoliday} from "../../app/dictionary/WorldHoliday";
import {Storage} from '@ionic/storage';
import * as moment from "moment";

@Component({
    selector: 'page-ion-calendar',
    templateUrl: 'ion-calendar.html'
})

export class IonCalendarPage {
    mockDateForWeekHeader: Date = new Date();
    currentDate: Date = new Date();
    locale: String;
    weekStartsOn: number = 1;
    refresh: Subject<any> = new Subject();
    holidayEngine: HolidayEngine;
    events: CalendarEvent[] = [];
    currentYear: number = new Date().getFullYear();
    yearPickerDate: string = new Date().toISOString();
    slide1 = {date: new Date()};
    slide2 = {date: new Date()};
    slide3 = {date: new Date()};


    @ViewChild(Slides) slides: Slides;
    @ViewChild('customHeaderTemplate') customHeaderTemplate: TemplateRef<any>;
    private slidesNotInited: boolean = true;

    constructor(private storage: Storage,
                private navCtrl: NavController,
                private zone: NgZone,
                private commonSettings: CommonSettings) {
        this.locale = commonSettings.locale;
        this.weekStartsOn = commonSettings.weekStartsOn();
        storage.get('events').then((result) => {
            this.holidayEngine = new HolidayEngine(result || []);
            this.generateCalendarEvents(this.currentYear);
        });
        this.initSlides();
    }

    private slideWillChange() {
        // this.slides.lockSwipes(true);
        // setTimeout(() => this.slides.lockSwipes(false), 400);

        if (this.currentDate.getFullYear() === this.currentYear) {
            return;
        }
        this.currentYear = this.currentDate.getFullYear();
        this.yearPickerDate = null;
        this.generateCalendarEvents(this.currentYear);
    }

    private slideNextStart() {
        if (this.slidesNotInited) {
            this.slidesNotInited = false;
            return;
        }
        this.currentDate = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
    }

    private slidePrevStart() {
        this.currentDate = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
    }

    private slideNextEnd() {
        let currentIndex = this.slides.getActiveIndex();
        if (currentIndex === 2) {
            this.slide3.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
        } else if (currentIndex === 3) {
            this.slide1.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
        } else if (currentIndex === 4) {
            this.slides.slideTo(1, 0, false);
            this.slide2.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
        }
    }

    private slidePrevEnd() {
        let currentIndex = this.slides.getActiveIndex();
        if (currentIndex === 0) {
            this.slides.slideTo(3, 0, false);
            this.slide2.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
        } else if (currentIndex === 1) {
            this.slide3.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
        } else if (currentIndex === 2) {
            this.slide1.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
        }
    }


    private dayClicked({date}: { date: Date }): void {
        this.navCtrl.push(HolidayPage, {
            date: date
        });
    }


    private openHoliday($event): void {
        alert(JSON.stringify($event));
        this.navCtrl.push(HolidayPage, {
            date: new Date()
        });
    }

    private generateCalendarEvents(year: number): void {
        this.events = this.holidayEngine.getCalendarEvents(year)
            .concat(WorldHoliday.toCalendarEvents(year));
    }

    private selectYear() {
        this.currentDate.setFullYear(moment(this.yearPickerDate.substring(0, 10), "YYYY-MM-DD").year());
        this.toDate(new Date(this.currentDate));
    }

    toDate(date) {
        this.currentDate = date;
        this.initSlides();
        this.slides.slideTo(1, 0, false);
    }

    private today() {
        this.toDate(new Date());
    }

    private initSlides() {
        this.slide1.date = this.currentDate;
        this.slide2.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
        this.slide3.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
    }

    private withMonths(date: Date, monthNumber) {
        let result = new Date(date)
        result.setMonth(monthNumber);
        return result;
    }

}
