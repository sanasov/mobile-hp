import {Injectable} from "@angular/core";
import {LocalNotifications} from "@ionic-native/local-notifications";
import HappyHoliday from "../domain/happy-holiday";

declare var cordova;

@Injectable()
export class NotificationService {


    constructor(public localNotifications: LocalNotifications) {
    }

    public initNotifications(holidays): void {
        this.localNotifications.schedule([
            {
                id: 1,
                text: 'This is text 1' + new Date(),
                title: 'This is title 1',
                data: {secret: "Some data 1"},
                at: new Date(new Date().getTime() + 300 * 1000)
            },
            {
                id: 2,
                text: 'This is text 2' + new Date(),
                title: 'This is title 2',
                icon: 'http://example.com/icon.png',
                at: new Date(new Date().getTime() + 330 * 1000)
            }
        ]);
        this.localNotifications.getAllIds()
    }

    public initWorldHolidays(holidays: HappyHoliday[]) {
        this.localNotifications.schedule(
            holidays.map((holiday, i) => holiday.toILocalNotification(-i - 1))
        );
    }

    public initCustomHolidays(holidays: HappyHoliday[]) {
        this.localNotifications.schedule(
            holidays.map((holiday, i) => holiday.toILocalNotification(i + 1))
        );
    }

    public clearAllWorldHolidays() {
        this.localNotifications.getAllIds().then((ids) => {
            ids.filter((id) => id < 0).forEach((id) => this.localNotifications.clear(id));
        });
    }

    public clearAllCustomHolidays() {
        this.localNotifications.getAllIds().then((ids) => {
            ids.filter((id) => id > 0).forEach((id) => this.localNotifications.clear(id));
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
