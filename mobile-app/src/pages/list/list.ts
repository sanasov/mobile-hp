import {Component} from '@angular/core';
import {LanguagePage} from "./launguage-page/language";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {NavController, NavParams} from "ionic-angular";
import {Language} from "../../app/dictionary/language";
import {StorageRepositoryProvider} from "../../app/service/storage-repository/storage-repository";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  currentLanguage: Object = {};
  notification: Object = {worldHoliday: true, eventHoliday: true};


  constructor(private storageRepository: StorageRepositoryProvider, private storage: Storage, private translateService: TranslateService, private navCtrl: NavController, private navParams: NavParams) {
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

