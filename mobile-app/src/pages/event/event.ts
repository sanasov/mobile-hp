import {Component, OnDestroy} from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {EventModalPage} from "./event-modal/event-modal";

@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})
export class EventPage implements OnDestroy {

    events: Array<{ title: string, date: string }>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public modalCtrl: ModalController) {
        storage.get('events').then((result) => {
            this.events = result || [];
        });
    }

    openModal(event) {
        let modal = this.modalCtrl.create(EventModalPage, {'event': event});
        modal.present();
        return modal;
    }

    ngOnDestroy() {
        this.save();
    }

    addEvent() {
        var event = {title: "", date: ""};
        this.openModal(event)
            .onDidDismiss(data => {
                if (event.title) {
                    this.events.push(event);
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


    save() {
        this.storage.set('events', this.events);
    }

}
