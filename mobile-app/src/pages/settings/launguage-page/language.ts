import {Component, NgZone, OnInit} from '@angular/core';

import {TranslateService} from "@ngx-translate/core";
import {Language} from "../../../app/dictionary/language";
import {Storage} from '@ionic/storage';
import {NavParams} from "ionic-angular";
import {CommonSettings} from "../../../app/service/CommonSettings";

@Component({
    selector: 'app-language-page',
    templateUrl: './language.html'
})
export class LanguagePage implements OnInit {
    public language = Language;
    public deviceLanguage: string;

    constructor(private translateService: TranslateService,
                private zone: NgZone,
                private commonSettings: CommonSettings,
                private storage: Storage) {
    }

    ngOnInit() {
        this.storage.get('device-language').then((deviceLanguage: string) => {
            this.deviceLanguage = deviceLanguage;
        })

    }

    onLanguageChange() {
        this.zone.run(() => {
            this.translateService.use(this.deviceLanguage.toLocaleLowerCase());
            this.storage.set("device-language", this.deviceLanguage);
            this.commonSettings.locale = this.deviceLanguage;
        });
    }
}
