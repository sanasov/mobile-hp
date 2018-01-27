import {Component, TemplateRef, ViewChild} from '@angular/core';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})

export class CalendarPage {
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    @ViewChild('customHeaderTemplate') customHeaderTemplate: TemplateRef<any>;

    view: string = 'month';

    viewDate: Date = new Date();
    weekendDays: Array<String> = ["a", "b", "c", "d", "c", "d", "c"];

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

    events: CalendarEvent[] = [
        // {
        //     start: subDays(startOfDay(new Date()), 1),
        //     end: addDays(new Date(), 1),
        //     title: 'A 3 day event',
        //     color: colors.red,
        //     actions: this.actions
        // },
        // {
        //     start: startOfDay(new Date()),
        //     title: 'An event with no end date',
        //     color: colors.yellow,
        //     actions: this.actions
        // },
        // {
        //     start: subDays(endOfMonth(new Date()), 3),
        //     end: addDays(endOfMonth(new Date()), 3),
        //     title: 'A long event that spans 2 months',
        //     color: colors.blue
        // },
        // {
        //     start: addHours(startOfDay(new Date()), 2),
        //     end: new Date(),
        //     title: 'A draggable and resizable event',
        //     color: colors.yellow,
        //     actions: this.actions,
        //     resizable: {
        //         beforeStart: true,
        //         afterEnd: true
        //     },
        //     draggable: true
        // }
    ];

    activeDayIsOpen: boolean = false;

    // constructor(private modal: NgbModal) {}

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        // if (isSameMonth(date, this.viewDate)) {
        //     if (
        //         (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        //         events.length === 0
        //     ) {
        //         this.activeDayIsOpen = false;
        //     } else {
        //         this.activeDayIsOpen = true;
        //         this.viewDate = date;
        //     }
        // }
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

    addEvent(): void {
        // this.events.push({
        //     title: 'New event',
        //     start: startOfDay(new Date()),
        //     end: endOfDay(new Date()),
        //     color: colors.red,
        //     draggable: true,
        //     resizable: {
        //         beforeStart: true,
        //         afterEnd: true
        //     }
        // });
        this.refresh.next();
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
