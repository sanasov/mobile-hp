import {Component, NgZone} from '@angular/core';
import {LanguagePage} from "./launguage-page/language";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {Language} from "../../app/dictionary/language";
import {StorageRepositoryProvider} from "../../app/service/storage-repository/storage-repository";
import User from "../../app/domain/user";
import {ProfileModalPage} from "./profile-modal/profile-modal";

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    locale: string;
    currentLanguage: Object = {};
    notification: Object = {worldHoliday: true, eventHoliday: true};
    user: User = new User("", "", null);


    constructor(private storageRepository: StorageRepositoryProvider,
                private storage: Storage,
                private modalCtrl: ModalController,
                private translateService: TranslateService,
                private navCtrl: NavController,
                private navParams: NavParams,
                private zone: NgZone) {

        this.zone.run(() => {
            storageRepository.getUser().then((result: User) => {
                this.user = result;
            });
            this.locale = translateService.currentLang;
        });
    }

    ngOnInit() {
        this.storage
            .get("device-language")
            .then((deviceLanguage) => {
                this.currentLanguage = Language[deviceLanguage];
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

    openModalProfile() {
        let modal = this.modalCtrl.create(ProfileModalPage, {'user': this.user});
        modal.present();
        modal.onDidDismiss((savedUser: User) => {
            this.user = savedUser;
        });
    }

    openLanguagePage(event) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(LanguagePage, {currentLanguage: this.currentLanguage});
    }

    ionViewWillEnter() {
        this.storage
            .get("device-language")
            .then((deviceLanguage) => {
                this.currentLanguage = Language[deviceLanguage];
            })
    }

    saveNotificationSettings() {
        this.storage.set("notification", this.notification);
    }
}

