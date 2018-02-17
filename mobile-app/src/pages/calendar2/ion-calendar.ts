import {Component, NgZone, ViewChild} from "@angular/core";
import {Language} from "../../app/dictionary/language";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'page-ion-calendar',
    templateUrl: 'ion-calendar.html'
})

export class IonCalendarPage {

    currentDate: Date = new Date()
    eventSource: [];
    locale: String;
    weekStartsOn: number = 1;

    constructor( private translateService: TranslateService) {
        this.eventSource = this.createRandomEvents();
        translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.locale = translateService.currentLang;
            this.weekStartsOn = this.locale === Language.EN.locale.toLowerCase() ? 0 : 1;
        });
    }

    private onEventSelected($event): void {
        // alert("onEventSelected" + "\n" + JSON.stringify($event));
    }

    private onTimeSelected($event): void {
        // alert("onTimeSelected" + "\n" + JSON.stringify($event));
    }

    private onCurrentDateChanged(date): void {
        this.currentDate = date;
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }

}
