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


    constructor(private storage: Storage, private translateService: TranslateService, private navCtrl: NavController, private navParams: NavParams) {
    }

    ngOnInit() {
        this.storage
            .get("device-language")
            .then((deviceLanguage) => {
                this.currentLanguage = deviceLanguage;
                this.translateService.use(deviceLanguage.toLocaleLowerCase())
            })
    }

    openLanguagePage(event) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(LanguagePage, {});
    }
}

