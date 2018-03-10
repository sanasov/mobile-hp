import {ModalController, Navbar, NavController, NavParams, ViewController} from "ionic-angular";
import {Component, OnDestroy, ViewChild} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {EventModalPage} from "../event-modal/event-modal";
import HolidayEvent from "../../../app/domain/holiday-event";
import * as moment from "moment";
import * as _ from 'underscore';
import {HappyHolidays} from "../../../app/service/magic-number/HappyHolidays";
import HappyHoliday from "../../../app/domain/happy-holiday";
import {MagicNumberUtils} from "../../../app/service/magic-number/MagicNumberUtils";
import {StorageRepositoryProvider} from "../../../app/service/storage-repository/storage-repository";

@Component({
    templateUrl: 'event-card.html'
})
export class EventCardPage implements OnDestroy {
    private event: HolidayEvent;
    private locale: string;
    private minNotifyDate: string = moment(new Date()).format('YYYY-MM-DD');
    private nearestHolidays: Array<HappyHoliday>;
    @ViewChild('navbar') navBar: Navbar;

    constructor(private navParams: NavParams,
                private navCtrl: NavController,
                private repository: StorageRepositoryProvider,
                public translateService: TranslateService,
                public modalCtrl: ModalController,
                public viewCtrl: ViewController) {
        this.event = navParams.get('event');
        this.locale = translateService.currentLang;
        if (this.event.magicEvent) {
            this.calculateHolidays();
        }
    }

    openModalEditTitle() {
        let modal = this.modalCtrl.create(EventModalPage, {'event': this.event});
        modal.present();
    }


    ngOnDestroy(): void {

    }

    ionViewDidEnter() {
        this.navBar.backButtonClick = () => {
            this.repository.setHolidayEvents(this.navParams.get('events'));
            this.navCtrl.pop();
        };

    }

    private diffDays(): number {
        return MagicNumberUtils.diffDays(new Date(), this.event.date);
    }

    private isFuture(): boolean {
        return this.diffDays() === 0 || this.event.date >= new Date();
    }

    private dateChange(dateString): void {
        this.event.magicEvent = false;
        this.event.dateString = dateString;
        this.event.changeNotifyDateToFutureEventDate();
    }

    discoverHolidays() {
        this.event.magicEvent = true;
        this.calculateHolidays();
    }

    private calculateHolidays(): void {
        this.nearestHolidays = [];
        const startYear = this.event.date <= new Date() ? new Date().getFullYear() : this.event.date.getFullYear();
        for (let year = startYear; year <= startYear + 10; year++) {
            this.nearestHolidays = _.unique(
                this.nearestHolidays.concat(new HappyHolidays([this.event], new Date(), year).getEventHolidays()),
                false,
                (hp) => hp.title + hp.description
            );
        }
        this.nearestHolidays = _.sortBy(this.nearestHolidays.filter(h => h.date >= new Date() && h.date >= this.event.date), (holiday) => holiday.date).slice(0, 4);
    }
}
