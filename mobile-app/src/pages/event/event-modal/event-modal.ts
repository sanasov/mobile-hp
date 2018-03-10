import {NavParams, Platform, ViewController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import HolidayEvent from "../../../app/domain/holiday-event";
import {EventHints} from "../../../app/dictionary/EventHints";
import {TranslateService} from "@ngx-translate/core";

@Component({
    templateUrl: 'event-modal.html'
})
export class EventModalPage implements OnInit {
    event: HolidayEvent;
    hints: Array<string>;

    constructor(private params: NavParams,
                private viewCtrl: ViewController,
                private translateService: TranslateService) {

        this.event = this.params.get('event') || {};
        this.initHints();
    }


    ngOnInit(): void {
        setTimeout(() => document.getElementById("hp-event-title").focus(), 500);

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    readyAddEvent($event) {
        if ($event.key === "Enter") {
            document.getElementById("hp-event-title").blur();
        }
    }

    initHints() {
        // this.hints = ["Last time was in Sochi", "Mom's birthday", "Finish school", "First kiss"];
        this.hints = new EventHints(this.translateService.currentLang).hints();
    }
}
