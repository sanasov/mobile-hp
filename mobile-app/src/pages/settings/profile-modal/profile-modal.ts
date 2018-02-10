import {NavParams, Platform, ViewController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import User from "../../../app/domain/user";

@Component({
    templateUrl: 'profile-modal.html'
})
export class ProfileModalPage implements OnInit {
    user: User;

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController) {
        this.user = this.params.get('user');
    }


    ngOnInit(): void {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}