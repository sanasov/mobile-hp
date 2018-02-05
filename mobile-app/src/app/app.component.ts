import {Component, NgZone, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";

import {ListPage} from '../pages/list/list';
import {CalendarPage} from "../pages/calendar/calendar";
import {EventPage} from "../pages/event/event";
import {Storage} from '@ionic/storage';
import {Language} from "./dictionary/language";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    eventPage: any = EventPage;
    calendarPage: any = CalendarPage;
    listPage: any = ListPage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService, public storage: Storage, private zone: NgZone) {
        this.initializeApp();

    }

    initializeApp() {
        this.defineLanguage().then(() => {
            this.platform.ready().then(() => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                this.statusBar.styleLightContent();
               setTimeout(() => this.splashScreen.hide(), 10000);
            });
        })
    }

    private defineLanguage() {
        let deviceLanguage = Language[this.findDeviceLanguageOrDefaultFromLocalStorage(Language.EN.toString())];
        return this.storage.get("device-language").then((result: string) => {
            this.zone.run(() => {
                if (result) {
                    deviceLanguage = result;
                } else {
                    this.storage.set("device-language", deviceLanguage);
                }
                this.translateService.use(deviceLanguage.toLocaleLowerCase());
            });
        });
    }

    private findDeviceLanguageOrDefaultFromLocalStorage(defaultLanguage: string): string {
        const langFromNavigator = Language[navigator.language.substr(0, 2).toUpperCase()];
        if (langFromNavigator && langFromNavigator !== Language.RU.locale) {
            return langFromNavigator;
        }
        return defaultLanguage;
    }

}
