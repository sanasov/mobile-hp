import {Injectable} from "@angular/core";
import {LocalNotifications} from "@ionic-native/local-notifications";
import HappyHoliday from "../domain/happy-holiday";
import HolidayEvent from "../domain/holiday-event";
import {TranslateService} from "@ngx-translate/core";
import {HolidayService} from "./HolidayService";
import {WorldHoliday} from "../dictionary/WorldHoliday";

declare var cordova;

@Injectable()
export class NotificationService {

    private static NEXT_YEARS_AMOUNT: number = 2;
    private static EVENT_ID_STEP: number = 1000;

    constructor(private localNotifications: LocalNotifications, private translateService: TranslateService) {
    }


    public initWorldNotifications(): void {
        if (!window['cordova']) {
            return;
        }
        this.localNotifications.schedule(
            WorldHoliday.toLocalNotifications(new Date().getFullYear(), this.translateService)
        );
    }

    public initEventsNotifications(events: HolidayEvent[]): void {
        if (!window['cordova']) {
            return;
        }
        events.forEach(event => this.initEventNotifications(event));
    }

    public initEventNotifications(event: HolidayEvent) {
        if (!window['cordova']) {
            return;
        }
        const eventLocalNotifications = new HolidayService(event, null)
            .happyHolidays(NotificationService.NEXT_YEARS_AMOUNT)
            .map((hh, i) => hh.toILocalNotification(NotificationService.EVENT_ID_STEP * hh.eventId + i + 1));
        this.localNotifications.schedule(eventLocalNotifications);
        const eventNotifyAtNotification = event.toILocalNotification();
        if (eventNotifyAtNotification) {
            this.localNotifications.schedule(eventNotifyAtNotification);
        }
    }

//birthday eventId = 0
    public initBirthdayNotification(birthday: Date) {
        if (!window['cordova']) {
            return;
        }
        this.localNotifications.schedule(
            new HolidayService(null, birthday).birthdayHolidays(NotificationService.NEXT_YEARS_AMOUNT)
                .map((hh, i) => hh.toILocalNotification(NotificationService.EVENT_ID_STEP * hh.eventId + i + 1))
        );
    }

    // all world holiday notificationID < 0
    public clearAllWorldHolidays() {
        if (!window['cordova']) {
            return;
        }
        this.localNotifications.getAllIds().then((ids) => {
            ids.filter((id) => id < 0).forEach((id) => this.localNotifications.clear(id));
        });

    }

    // assume that there is no more than 500 holidays belongs to only event
    public clearAllByEventId(eventId) {
        if (!window['cordova']) {
            return;
        }
        cordova.plugins.notification.local.getIds((ids) => {
            console.log(JSON.stringify("eventId: " + eventId));
            console.log(JSON.stringify(ids));
            ids.filter((id) => id - 1000 * eventId < 1000).forEach((id) => cordova.plugins.notification.local.clear(id));
        });
    }

    public clearAllEventNotifications() {
        if (!window['cordova']) {
            return;
        }
        cordova.plugins.notification.local.getIds((ids) => {
            ids.filter((id) => id > 0).forEach((id) => cordova.plugins.notification.local.clear(id));
        });
    }


    public initCordovaNotifications(holidays): void {
        if (!window['cordova']) {
            return;
        }
        cordova.plugins.notification.local.schedule({
            title: 'My first notification',
            text: 'Thats pretty easy...',
            trigger: {at: new Date(new Date().getTime() + 15 * 1000)},
            actions: [
                {id: 'yes', title: 'Yes'},
                {id: 'no', title: 'No'}
            ]
        });
    }


}
