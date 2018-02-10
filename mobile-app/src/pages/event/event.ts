import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {EventModalPage} from "./event-modal/event-modal";
import {TranslateService} from "@ngx-translate/core";
import {EventCardPage} from "./event-card/event-card";

@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})
export class EventPage implements OnDestroy {
    locale: string;
    events: Array<{ title: string, date: string }>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                public modalCtrl: ModalController,
                private translateService: TranslateService) {
        storage.get('events').then((result) => {
            this.events = result || [];
        });
        this.locale = translateService.currentLang;
    }

    ngOnDestroy() {
        this.save();
    }

    addEvent() {
        var event = {title: "", date: ""};
        let modal = this.modalCtrl.create(EventModalPage, {'event': event});
        modal.present();
        modal.onDidDismiss(data => {
                if (event.title) {
                    this.events.push(event);
                    this.openEventCard(event)
                }
            });
    }

    preRemoveSwipe($event, event) {
        event.preClose = $event.deltaX > 0;
    }

    remove(event) {
        this.events.splice(this.events.indexOf(event), 1);
        this.save();
    }

    openEventCard(event) {
            this.navCtrl.push(EventCardPage, {
            event: event
        });
    }


    save() {
        this.storage.set('events', this.events);
    }

}
