import {Component, TemplateRef, ViewChild} from '@angular/core';
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
    currentYear: Number = new Date().getFullYear();
    weekendDays: Array<String> = ["a", "b", "c", "d", "c", "d", "c"];


    constructor(private storage: Storage, private navCtrl: NavController, private navParams: NavParams) {
        storage.get('events').then((result) => {
            this.holidayEngine = new HolidayEngine(result || []);
            this.events = this.holidayEngine.getCalendarEvents(2019)
                .concat(this.holidayEngine.getCalendarEvents(2017))
                .concat(this.holidayEngine.getCalendarEvents(2016))
                .concat(this.holidayEngine.getCalendarEvents(2015))
                .concat(this.holidayEngine.getCalendarEvents(2014));
        });
    }


    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [];

    activeDayIsOpen: boolean = false;

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        this.openHolidayPage();
    }

    openHolidayPage() {
        this.navCtrl.push(HolidayPage);
    }


    eventTimesChanged({
                          event,
                          newStart,
                          newEnd
                      }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = {event, action};
        // this.modal.open(this.modalContent, { size: 'lg' });
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
