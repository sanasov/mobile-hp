import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CalendarPage} from "../pages/calendar/calendar";
import {EventPage} from "../pages/event/event";
import {IonicStorageModule} from "@ionic/storage";
import {EventModalPage} from "../pages/event/event-modal/event-modal";
import {CalendarModule} from "angular-calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguagePage} from "../pages/list/launguage-page/language";
import {HolidayPage} from "../pages/calendar/holiday/holiday";


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CalendarPage,
        EventPage,
        EventModalPage,
        LanguagePage,
        HolidayPage,
        ListPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        CalendarModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (translateLoaderFactory),
                deps: [HttpClient]
            }
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CalendarPage,
        EventPage,
        EventModalPage,
        LanguagePage,
        HolidayPage,
        ListPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}


export function translateLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
