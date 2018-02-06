import {Component, NgZone, TemplateRef, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {Subject} from "rxjs/Subject";
import {HolidayEngine} from "../../app/service/HolidayEngine";
import {HolidayPage} from "./holiday/holiday";
import {NavController, NavParams} from "ionic-angular";
import {WorldHoliday} from "../../app/dictionary/WorldHoliday";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Language} from "../../app/dictionary/language";

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})

export class CalendarPage {
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    @ViewChild('customHeaderTemplate') customHeaderTemplate: TemplateRef<any>;

    view: string = 'month';
    holidayEngine: HolidayEngine;
    viewDate: Date = new Date();
    currentYear: number = new Date().getFullYear();
    weekStartsOn: number = 1;
    locale: String;
    refresh: Subject<any> = new Subject();
    events: CalendarEvent[] = [];
    activeDayIsOpen: boolean = false;

    constructor(private storage: Storage, private navCtrl: NavController, private navParams: NavParams, private translateService: TranslateService, private zone: NgZone,) {
        storage.get('events').then((result) => {
            this.holidayEngine = new HolidayEngine(result || []);
            this.generateCalendarEvents(this.currentYear);
        });

        translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.locale = translateService.currentLang;
            this.weekStartsOn = this.locale === Language.EN.locale.toLowerCase() ? 0 : 1;
            this.refresh.next();
        });
    }


    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        this.navCtrl.push(HolidayPage, {
            date: date,
            events: events
        });
    }

    updateYear() {
        if (this.viewDate.getFullYear() === this.currentYear) {
            return;
        }
        this.currentYear = this.viewDate.getFullYear();
        this.generateCalendarEvents(this.currentYear);
    }

    generateCalendarEvents(year: number): void {
        this.events = this.holidayEngine.getCalendarEvents(year)
            .concat(WorldHoliday.toCalendarEvents(year));
    }

    changeMonth($event): void {
        if (Math.abs($event.deltaX) < 100) {
            return;
        }
        if ($event.deltaX < 0) {
            document.getElementById("calendarNextMonth").click();
        } else {
            document.getElementById("calendarPreviousMonth").click();
        }
    }
}
