import {ModalController, NavParams, Platform, ViewController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {EventModalPage} from "../event-modal/event-modal";
import HolidayEvent from "../../../app/domain/holiday-event";

@Component({
    templateUrl: 'event-card.html'
})
export class EventCardPage implements OnInit {
    private event: HolidayEvent;
    private locale: string;

    constructor(public platform: Platform,
                public navParams: NavParams,
                public translateService: TranslateService,
                public modalCtrl: ModalController,
                public viewCtrl: ViewController) {
        this.event = navParams.get('event');
        this.locale = translateService.currentLang;
    }

    openModalEditTitle() {
        let modal = this.modalCtrl.create(EventModalPage, {'event': this.event});
        modal.present();
    }

    ngOnInit(): void {

    }
}
