import {_} from 'underscore'
import HappyHoliday from "../domain/happy-holiday";
import {TranslateService} from "@ngx-translate/core";
import {holidayColors} from "./holidayColors";
import {CalendarEvent} from "angular-calendar";
import {TimeMeasure} from "./timeMeasure";
import {ILocalNotification} from "@ionic-native/local-notifications";

export class WorldHoliday {
    static holidays: Array<{ id: string, date: string }> = [
        {id: "ARCHAEOLOGIST", date: "15.08"},
        {id: "BLONDE", date: "31.05"},
        {id: "BOSS", date: "16.10"},
        {id: "CHOCOLATE", date: "11.07"},
        {id: "CATHOLIC_CHRISTMAS", date: "25.12"},
        {id: "ORTHODOX_CHRISTMAS", date: "7.01"},
        {id: "FAMILY", date: "15.05"},
        {id: "FOOTBALL", date: "10.12"},
        {id: "FRIENDS", date: "30.07"},
        {id: "HALLOWEEN", date: "31.10"},
        {id: "HUGS", date: "21.01"},
        {id: "KIT", date: "19.02"},
        {id: "LAUGHT", date: "11.04"},
        {id: "MEN", date: "19.11"},
        {id: "MOUNTIN", date: "11.12"},
        {id: "MOVIE", date: "28.12"},
        {id: "MUSEUM", date: "18.05"},
        {id: "NURSE", date: "12.05"},
        {id: "PI", date: "14.03"},
        {id: "POLOTENCE", date: "25.05"},
        {id: "ROCK_N_ROLL", date: "13.04"},
        {id: "SLEEPCAT", date: "1.03"},
        {id: "SUN", date: "3.05"}
    ];

    worldHoliday: HappyHoliday;

    constructor(private date: Date,
                private translateService: TranslateService) {

        this.initWorldHoliday();

    }

    public get (): HappyHoliday {
        return this.worldHoliday;
    }

    // assume we have max 1 holiday per day
    private initWorldHoliday(): void {
        const dayMonth = this.toDayMonth(this.date);
        const worldHolidayId = WorldHoliday.holidays
            .filter(h => h.date === dayMonth)
            .map(h => h.id)[0];
        if (!worldHolidayId) {
            return;
        }
        this.worldHoliday = new HappyHoliday(worldHolidayId, "", "", this.date, 3, null, null, TimeMeasure.YEAR);
        this.translateService.get(worldHolidayId).subscribe(result => {
            this.worldHoliday.title = result['TITLE'];
            this.worldHoliday.description = result['DESCRIPTION'];
        });
    }

    private toDayMonth(date: Date): String {
        return date.getDate() + "." + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    }

    private static toDate(dayMonth: String, year: number): Date {
        return new Date(year, +dayMonth.split(".")[1] - 1, +dayMonth.split(".")[0])
    }

    static toCalendarEvents(year: number): Array<CalendarEvent> {
        return WorldHoliday.holidays.map(holiday => {
            return {
                start: WorldHoliday.toDate(holiday.date, year),
                end: WorldHoliday.toDate(holiday.date, year),
                title: holiday.id,
                color: holidayColors.yellow,
                actions: null
            }
        });
    }

    // all world holiday notificationId < 0
    public static toLocalNotifications(year: number, translateService: TranslateService): Array<ILocalNotification> {
        let localNotifications = [];
        for (let i = 0; i < WorldHoliday.holidays.length; i++) {
            const holiday = WorldHoliday.holidays[i];
            let date = WorldHoliday.toDate(holiday.date, year);
            date.setHours(11);
            if (date < new Date()) continue;

            localNotifications.push({
                id: -1000 * year - i,
                title: translateService.instant(holiday.id),
                text: "",
                at: date
            });
        }
        return localNotifications;
    }
}