import {Component, OnDestroy} from '@angular/core';
import {ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {EventModalPage} from "./event-modal/event-modal";
import {TranslateService} from "@ngx-translate/core";
import {EventCardPage} from "./event-card/event-card";
import HolidayEvent from "../../app/domain/holiday-event";
import {StorageRepositoryProvider} from "../../app/service/storage-repository/storage-repository";
import {NotificationService} from "../../app/service/NotificationService";

@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})
export class EventPage implements OnDestroy {
    locale: string;
    eventSegment: string = "ALL";
    events: HolidayEvent[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public platform: Platform,
                private repository: StorageRepositoryProvider,
                private notificationService: NotificationService,
                public modalCtrl: ModalController,
                private translateService: TranslateService) {
        repository.getHolidayEvents().then((result: HolidayEvent[]) => {
            this.events = result;
        });
        this.locale = translateService.currentLang;
    }

    ngOnDestroy() {
        this.save();
    }

    addEvent() {
        const maxId = this.events.length === 0 ? 0 : this.events[this.events.length - 1].id;
        let event = new HolidayEvent(maxId + 1, "", new Date(), null, false);
        let modal = this.modalCtrl.create(EventModalPage, {'event': event});
        modal.present();
        modal.onDidDismiss(data => {
            if (event.title) {
                this.events.push(event);
                this.openEventCard(event)
            }
        });
    }

    remove(event: HolidayEvent) {
        this.events.splice(this.events.indexOf(event), 1);
        this.notificationService.clearAllCustomHolidaysByEventId(event.id);
        this.save();
    }

    openEventCard(event) {
        this.navCtrl.push(EventCardPage, {
            event: event,
            events: this.events
        });
    }

    filteredEvents() {
        return (this.events || []).filter(event => this.showableEvent(event.date));
    }

    private showableEvent(date: Date) {
        return !date ||
            this.eventSegment === "ALL" ||
            (this.eventSegment === "PAST" && date < new Date()) ||
            (this.eventSegment === "FUTURE" && date >= new Date());
    }

    save() {
        this.repository.setHolidayEvents(this.events);
    }

}
