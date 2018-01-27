import {NavParams, Platform, ViewController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";

@Component({
    templateUrl: 'event-modal.html'
})
export class EventModalPage implements OnInit {
    event;

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController) {

        this.event = this.params.get('event') || {};

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
}