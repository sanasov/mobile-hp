import {Component} from '@angular/core';
import {LanguagePage} from "./launguage-page/language";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {NavController, NavParams} from "ionic-angular";
import {Language} from "../../app/dictionary/language";

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    currentLanguage: Language;
    notification: Object = {worldHoliday: true, eventHoliday: true};


    constructor(private storage: Storage, private translateService: TranslateService, private navCtrl: NavController, private navParams: NavParams) {
    }

    ngOnInit() {
        this.storage
            .get("device-language")
            .then((deviceLanguage) => {
                this.currentLanguage = deviceLanguage;
                this.translateService.use(deviceLanguage.toLocaleLowerCase())
            })

        this.storage
            .get("notification")
            .then((result) => {
                if (result) {
                    this.notification = result;
                }
            })
    }

    openLanguagePage(event) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(LanguagePage, {currentLanguage: this.currentLanguage});
    }

    ionViewWillEnter() {
        this.storage
            .get("device-language")
            .then((deviceLanguage) => {
                this.currentLanguage = deviceLanguage;
            })
    }

    saveNotificationSettings() {
        this.storage.set("notification", this.notification);
    }
}

