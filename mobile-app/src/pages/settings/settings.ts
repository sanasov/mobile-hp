import {Component, NgZone} from '@angular/core';
import {LanguagePage} from "./launguage-page/language";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {ModalController, NavController} from "ionic-angular";
import {Language} from "../../app/dictionary/language";
import {StorageRepositoryProvider} from "../../app/service/storage-repository/storage-repository";
import User from "../../app/domain/user";
import {ProfileModalPage} from "./profile-modal/profile-modal";
import {NotificationService} from "../../app/service/NotificationService";
import HolidayEvent from "../../app/domain/holiday-event";

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    locale: string;
    currentLanguage: Object = {};
    notification: Object = {worldHoliday: false, eventHoliday: false};
    user: User = new User("", "", null);
    events: Array<HolidayEvent> = [];

    constructor(private repository: StorageRepositoryProvider,
                private storage: Storage,
                private modalCtrl: ModalController,
                private translateService: TranslateService,
                private notificationService: NotificationService,
                private navCtrl: NavController,
                private zone: NgZone) {

        this.zone.run(() => {
            repository.getUser().then((result: User) => {
                this.user = result;
            });
            this.locale = translateService.currentLang;
        });
    }


    ionViewDidEnter() {
        this.repository.getHolidayEvents().then((result: HolidayEvent[]) => {
            this.events = result || [];
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
            if (savedUser) {
                this.user = savedUser;
            }
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

    toggleWorldHoliday($event) {
        if ($event.value) {
            this.notificationService.initWorldNotifications();
        } else {
            this.notificationService.clearAllWorldHolidays();
        }
        this.saveNotificationSettings();
    }

    toggleEventHoliday($event) {
        if ($event.value) {
            this.notificationService.initEventsNotifications(this.events);
            this.notificationService.initBirthdayNotification(this.user.birth);
        } else {
            this.notificationService.clearAllEventNotifications();
        }
        this.saveNotificationSettings();
    }

    saveNotificationSettings() {
        this.storage.set("notification", this.notification);
    }
}

