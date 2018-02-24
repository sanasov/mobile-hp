import {NavParams, Platform, ViewController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import HolidayEvent from "../../../app/domain/holiday-event";

@Component({
    templateUrl: 'event-modal.html'
})
export class EventModalPage implements OnInit {
    event: HolidayEvent;
    hints: Array<string>;

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController) {

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
        this.hints = ["Last time was in Sochi", "Mom's birthday", "Finish school", "First kiss"];
    }
}
