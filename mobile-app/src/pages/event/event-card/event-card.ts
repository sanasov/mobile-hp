import {ModalController, NavParams, Platform, ViewController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {EventModalPage} from "../event-modal/event-modal";
import HolidayEvent from "../../../app/domain/holiday-event";
import * as moment from "moment";
import * as _ from 'underscore'
import {HappyHolidays} from "../../../app/service/magic-number/HappyHolidays";
import HappyHoliday from "../../../app/domain/happy-holiday";
import {MagicNumberUtils} from "../../../app/service/magic-number/MagicNumberUtils";

@Component({
    templateUrl: 'event-card.html'
})
export class EventCardPage implements OnInit {
    private event: HolidayEvent;
    private locale: string;
    private minNotifyDate: string = moment(new Date()).format('YYYY-MM-DD');
    private nearestHolidays: Array<HappyHoliday>

    constructor(public platform: Platform,
                public navParams: NavParams,
                public translateService: TranslateService,
                public modalCtrl: ModalController,
                public viewCtrl: ViewController) {
        this.event = navParams.get('event');
        this.locale = translateService.currentLang;
        this.calculateHolidays();
    }

    openModalEditTitle() {
        let modal = this.modalCtrl.create(EventModalPage, {'event': this.event});
        modal.present();
    }


    ngOnInit(): void {

    }

    daysPast() {
        return MagicNumberUtils.diffDays(new Date(), this.event.date);
    }

    calculateHolidays(): void {
        this.event.magicEvent = true;
        this.nearestHolidays = [];
        for (let year = new Date().getFullYear(); year <= new Date().getFullYear() + 10; year++) {
            this.nearestHolidays = _.unique(
                this.nearestHolidays.concat(new HappyHolidays([this.event], new Date(), year).getEventHolidays()),
                false,
                (hp) => hp.title + hp.description
            );
        }
        this.nearestHolidays = _.sortBy(this.nearestHolidays.filter(h => h.date >= new Date()), (holiday) => holiday.date).slice(0, 4);
    }
}
