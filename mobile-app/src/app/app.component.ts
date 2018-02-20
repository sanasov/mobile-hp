import {Component, NgZone, ViewChild} from '@angular/core';
import {Nav, NavController, Platform, Slides} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";

import {CalendarPage} from "../pages/calendar/calendar";
import {EventPage} from "../pages/event/event";
import {Storage} from '@ionic/storage';
import {Language} from "./dictionary/language";
import {Tabs} from "ionic-angular/navigation/nav-interfaces";
import {SettingsPage} from "../pages/settings/settings";
import {NotificationService} from "./service/NotificationService";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {HolidayPage} from "../pages/calendar/holiday/holiday";
import {IonCalendarPage} from "../pages/calendar2/ion-calendar";
import {CommonSettings} from "./service/CommonSettings";
import User from "./domain/user";
import {StorageRepositoryProvider} from "./service/storage-repository/storage-repository";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    eventPage: any = EventPage;
    calendarPage: any = CalendarPage;
    ionCalendarPage: any = IonCalendarPage;
    settingsPage: any = SettingsPage;
    firstOpening: boolean = false;
    appReady: boolean = false;
    user: User = new User("", "", undefined);

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                private translateService: TranslateService,
                public storageRepository: StorageRepositoryProvider,
                public storage: Storage,
                private commonSettings: CommonSettings,
                private zone: NgZone) {
        this.initializeApp();
    }

    @ViewChild('mainTabs') tabRef: Tabs;
    @ViewChild(Slides) slides: Slides;

    ionViewDidEnter() {
        this.tabRef.select(2, null, null);
    }

   screenHeight() : any {
    return window.screen.height + "px";
  }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            this.defineLanguage();
            // this.storage.get("firstOpening").then((result: boolean) => this.firstOpening = (result || true));
        });
    }

    private defineLanguage() {
        let deviceLanguage = Language[this.findDeviceLanguageOrDefaultFromLocalStorage(Language.EN.locale)].locale;
        this.storage.get("device-language").then((result: string) => {
            this.zone.run(() => {
                if (result) {
                    deviceLanguage = result;
                } else {
                    this.storage.set("device-language", deviceLanguage);
                }
                this.commonSettings.locale = deviceLanguage.toLocaleLowerCase()
                this.translateService.use(deviceLanguage.toLocaleLowerCase());
                this.appReady = true;
            });
        });
    }

    private findDeviceLanguageOrDefaultFromLocalStorage(defaultLanguage: string): string {
        const langFromNavigator = Language[navigator.language.substr(0, 2).toUpperCase()];
        if (langFromNavigator && langFromNavigator !== Language.RU) {
            return langFromNavigator.locale;
        }
        return defaultLanguage;
    }

    private slideChanged(): void {
      if (this.slides.getActiveIndex() >=1) {
        this.slides.lockSwipes(true);
      }
      this.slides.slideNext(500, false);
        if (this.slides.isEnd()) {
            setTimeout(() => {
                this.firstOpening = false;
                // this.storage.set("firstOpening", this.firstOpening); разблокировать, когда закончишь со всем остальным
                this.storageRepository.setUser(this.user);
            }, 2000)
        }
    }

    ngAfterViewInit() {
        if (this.firstOpening) {
            setTimeout(() => {document.getElementById("introduction-name").focus()}, 100);
        }
    }

    nextSlide() {
        document.getElementById("introduction-name").blur()
        this.slides.slideNext(500, false);
        this.slides.lockSwipes(true);
    }

    ionCancel() {
        if (!this.user.birthString) {
            this.slides.lockSwipeToNext(true);
        }
    }

    selectDate() {
        setTimeout(() => {
            this.slides.lockSwipeToNext(false);
            this.nextSlide();
            this.slideChanged();
        }, 800);
    }
}
