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

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        CalendarPage,
        EventPage,
        EventModalPage,
        ListPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CalendarPage,
        EventPage,
        EventModalPage,
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
