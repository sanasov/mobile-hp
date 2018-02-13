import {Injectable} from "@angular/core";
import {LocalNotifications} from "@ionic-native/local-notifications";

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
                at: new Date(new Date().getTime() + 10 * 1000)
            },
            {
                id: 2,
                text: 'This is text 2' + new Date(),
                title: 'This is title 2',
                icon: 'http://example.com/icon.png',
                at: new Date(new Date().getTime() + 30 * 1000)
            }
        ]);
    }

    public initCordovaNotifications(holidays): void {
      if (!window['cordova']) {
        return;
      }
        cordova.plugins.notification.local.schedule({
            title: 'My first notification',
            text: 'Thats pretty easy...',
            trigger: { at: new Date(new Date().getTime() + 15 * 1000) },
            actions: [
                { id: 'yes', title: 'Yes' },
                { id: 'no',  title: 'No' }
            ]
        });
    }


}
