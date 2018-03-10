import {Component, TemplateRef, ViewChild} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {Subject} from "rxjs/Subject";
import {CommonSettings} from "../../app/service/CommonSettings";
import {HolidayPage} from "./holiday/holiday";
import {CalendarEvent} from "angular-calendar";
import {WorldHoliday} from "../../app/dictionary/WorldHoliday";
import * as moment from "moment";
import {HappyHolidays} from "../../app/service/magic-number/HappyHolidays";
import {StorageRepositoryProvider} from "../../app/service/storage-repository/storage-repository";
import HolidayEvent from "../../app/domain/holiday-event";
import HappyHoliday from "../../app/domain/happy-holiday";

@Component({
    selector: 'page-ion-calendar',
    templateUrl: 'ion-calendar.html'
})

export class CalendarPage {
    mockDateForWeekHeader: Date = new Date();
    hEvents: HolidayEvent[] = [];
    currentDate: Date = new Date();
    locale: String;
    weekStartsOn: number = 1;
    refresh: Subject<any> = new Subject();
    events: CalendarEvent[] = [];
    customHolidays: HappyHoliday[] = [];
    currentYear: number = new Date().getFullYear();
    yearPickerDate: string = new Date().toISOString();
    slide1 = {date: new Date()};
    slide2 = {date: new Date()};
    slide3 = {date: new Date()};
    static dateFormat: string = "YYYY-MM-DD";


    @ViewChild(Slides) slides: Slides;
    @ViewChild('customHeaderTemplate') customHeaderTemplate: TemplateRef<any>;
    private slidesNotInited: boolean = true;

    constructor(private repository: StorageRepositoryProvider,
                private navCtrl: NavController,
                private commonSettings: CommonSettings) {
        this.locale = commonSettings.locale;
        this.weekStartsOn = commonSettings.weekStartsOn();
        repository.getHolidayEvents().then((result: HolidayEvent[]) => {
            this.hEvents = result || [];
            this.generateCalendarEvents(this.currentYear);
        });
        this.initSlides();
    }

    private slideWillChange() {
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
        this.slides.lockSwipeToNext(true);
    }

    private slidePrevStart() {
        this.currentDate = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
        this.slides.lockSwipeToPrev(true);
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
        setTimeout(() => this.slides.lockSwipeToNext(false), 250);

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
        setTimeout(() => this.slides.lockSwipeToPrev(false), 250);
    }


    public openHoliday(): void {
        if (this.events
                .filter(calendarEvent => moment(new Date(), CalendarPage.dateFormat).isSame(moment(calendarEvent.start, CalendarPage.dateFormat))).length === 0) {
            return;
        }
        this.navCtrl.push(HolidayPage, {
            date: new Date(),
            customHolidays: this.customHolidays.filter(h => moment(new Date(), CalendarPage.dateFormat).isSame(moment(h.date, CalendarPage.dateFormat)))
        });
    }


    private dayClicked({date}: { date: Date }): void {
        if (this.events
                .filter(calendarEvent => moment(date, CalendarPage.dateFormat).isSame(moment(calendarEvent.start, CalendarPage.dateFormat))).length === 0) {
            return;
        }
        this.navCtrl.push(HolidayPage, {
            date: date,
            customHolidays: this.customHolidays.filter(h => moment(date, CalendarPage.dateFormat).isSame(moment(h.date, CalendarPage.dateFormat)))
        });
    }


    private generateCalendarEvents(year: number): void {
        let happyHolidays = new HappyHolidays(this.hEvents, this.commonSettings.user.birth, year);
        this.customHolidays = happyHolidays.all();
        this.events = happyHolidays.toCalendarEvents()
            .concat(WorldHoliday.toCalendarEvents(year));
    }

    private selectYear() {
        this.currentDate.setFullYear(moment(this.yearPickerDate.substring(0, 10), CalendarPage.dateFormat).year());
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

    private season(): string {
        const month = this.currentDate.getMonth() + 1;
        switch (month.toString()) {
            case '12':
            case '1':
            case '2':
                return 'winter';
            case '3':
            case '4':
            case '5':
                return 'spring';
            case '6':
            case '7':
            case '8':
                return 'summer';
            case '9':
            case '10':
            case '11':
                return 'autumn';

        }
    }

}
