import {NavController, NavParams, Platform, ViewController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";

@Component({
    templateUrl: 'holiday.html'
})
export class HolidayPage  {

    constructor(public platform: Platform,
                public params: NavParams,
                private navCtrl: NavController,
                private navParams: NavParams
                ) {

    }

}