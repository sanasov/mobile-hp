import {Component, NgZone, ViewChild} from '@angular/core';
import {Nav, Platform, Slides} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";

import {CalendarPage} from "../pages/calendar/ion-calendar";
import {EventPage} from "../pages/event/event";
import {Storage} from '@ionic/storage';
import {Language} from "./dictionary/language";
import {Tabs} from "ionic-angular/navigation/nav-interfaces";
import {SettingsPage} from "../pages/settings/settings";
import {CommonSettings} from "./service/CommonSettings";
import User from "./domain/user";
import {StorageRepositoryProvider} from "./service/storage-repository/storage-repository";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    eventPage: any = EventPage;
    ionCalendarPage: any = CalendarPage;
    settingsPage: any = SettingsPage;
    calendarTitle: string = "Calendar";
    eventsTitle: string = "Events";
    settingsTitle: string = "Settings";

    firstOpening: boolean = true;
    appReady: boolean = false;
    user: User = new User("", "", undefined);
    deltaHeight: number;

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

    screenHeight(): any {
        if (!this.deltaHeight) {
            return "calc(100%)";
        }
        return window.screen.availHeight - this.deltaHeight + "px";
    }


    ngAfterViewInit() {


    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (window['cordova']) {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
                if (screen.availWidth < 580) {
                    screen['orientation'].lock('portrait');
                }
            }
            this.defineLanguage();
            this.storageRepository.getUser().then((result: User) => this.commonSettings.user = result);
            this.storage.get("firstOpening").then((result: boolean) => {
                this.firstOpening = result == null ? true : result;
                this.appReady = true;
                setTimeout(() => this.prepareIntroductionSlides());
            });
        });
    }

    private prepareIntroductionSlides() {
        if (this.firstOpening) {
            if (document.getElementById("introduction")) {
                this.deltaHeight = window.screen.availHeight - document.getElementById("introduction").offsetHeight;
            }
            setTimeout(() => {
                document.getElementById("introduction-name").focus()
            }, 100);
            this.slides.lockSwipes(true)
        }
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
                this.commonSettings.locale = deviceLanguage.toLocaleLowerCase();
                this.translateService.use(deviceLanguage.toLocaleLowerCase());
                this.initTabTitle();
            });
        });
    }

    initTabTitle() {
        this.translateService.get("SETTINGS").subscribe(result => this.settingsTitle = result);
        this.translateService.get("EVENTS").subscribe(result => this.eventsTitle = result);
        this.translateService.get("CALENDAR").subscribe(result => this.calendarTitle = result);
    }

    private findDeviceLanguageOrDefaultFromLocalStorage(defaultLanguage: string): string {
        const langFromNavigator = Language[navigator.language.substr(0, 2).toUpperCase()];
        if (langFromNavigator && langFromNavigator !== Language.RU) {
            return langFromNavigator.locale;
        }
        return defaultLanguage;
    }

    private slideChanged(): void {
        this.slides.slideNext(500, false);
        if (this.slides.isEnd()) {
            setTimeout(() => {
                this.firstOpening = false;
                this.storage.set("firstOpening", this.firstOpening);
                this.storageRepository.setUser(this.user);
            }, 2000)
        }
    }


    nextSlide() {
        document.getElementById("introduction-name").blur()
        this.slides.lockSwipes(false);
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
