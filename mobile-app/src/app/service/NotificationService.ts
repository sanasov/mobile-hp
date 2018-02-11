import {Injectable} from "@angular/core";
import {LocalNotifications} from "@ionic-native/local-notifications";

@Injectable()
export class NotificationService {


    constructor(public localNotifications: LocalNotifications) {
    }


    public initNotificatons(holidays): void {
        this.localNotifications.schedule([
            {
                id: 3,
                text: 'This is text 3' + new Date(),
                title: 'This is title 3',
                data: {secret: "Some data 3"},
                at: new Date(new Date().getTime() - 10 * 60 * 1000)
            },
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


}
