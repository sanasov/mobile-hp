import {Component, TemplateRef, ViewChild} from "@angular/core";
import {Language} from "../../app/dictionary/language";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Slides} from "ionic-angular";
import {Subject} from "rxjs/Subject";
import {CommonSettings} from "../../app/service/CommonSettings";


@Component({
    selector: 'page-ion-calendar',
    templateUrl: 'ion-calendar.html'
})

export class IonCalendarPage {

    currentDate: Date = new Date();
    locale: String;
    weekStartsOn: number = 1;
    refresh: Subject<any> = new Subject();
    slide1 = {date: new Date()};
    slide2 = {date: new Date()};
    slide3 = {date: new Date()};


    @ViewChild(Slides) slides: Slides;
    @ViewChild('customHeaderTemplate') customHeaderTemplate: TemplateRef<any>;

    constructor(private translateService: TranslateService, private commonSettings: CommonSettings) {
        this.locale = commonSettings.locale;
        this.weekStartsOn = commonSettings.weekStartsOn();
        this.initSlides();
    }

    private slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        if (currentIndex === 1 || currentIndex === 4) {
            this.currentDate = this.slide1.date;
            this.slide2.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
            this.slide3.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
            if (currentIndex === 4) {
                this.slides.slideTo(1, 0, false);
            }
        } else if (currentIndex === 2) {
            this.currentDate = this.slide2.date;
            this.slide1.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
            this.slide3.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
        } else if (currentIndex === 3 || currentIndex === 0) {
            this.currentDate = this.slide3.date;
            this.slide1.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
            this.slide2.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
            if (currentIndex === 0) {
                this.slides.slideTo(3, 0, false);
            }
        }
    }

    private today() {
        this.currentDate = new Date();
        this.initSlides();
        this.slides.slideTo(1, 0, false);
    }

    private initSlides() {
        this.slide1.date = this.currentDate;
        this.slide2.date = this.withMonths(this.currentDate, this.currentDate.getMonth() + 1);
        this.slide3.date = this.withMonths(this.currentDate, this.currentDate.getMonth() - 1);
    }

    private withMonths(date: Date, monthNumber) {
        let result = new Date(date)
        result.setMonth(monthNumber);
        return result;
    }

}
