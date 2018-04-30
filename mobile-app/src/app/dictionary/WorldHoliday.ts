import {_} from 'underscore'
import HappyHoliday from "../domain/happy-holiday";
import {TranslateService} from "@ngx-translate/core";
import {holidayColors} from "./holidayColors";
import {CalendarEvent} from "angular-calendar";
import {TimeMeasure} from "./timeMeasure";
import {ILocalNotification} from "@ionic-native/local-notifications";

export class WorldHoliday {
    static holidays: Array<{ id: string, date: string }> = [
        {id: "ACT_OF_KIDNESS", date: "17.02"},
        {id: "ANIMALS", date: "4.10"},
        {id: "BEATLES", date: "16.01"},
        {id: "BLONDE", date: "31.05"},
        {id: "CHEESE", date: "29.09"},
        {id: "CHOCOLATE", date: "7.07"},
        {id: "CINEMA", date: "28.12"},
        {id: "EARTH", date: "20.03"},
        {id: "ESKIMO_PIE", date: "24.01"},
        {id: "FAMILY", date: "15.05"},
        {id: "FOREST", date: "21.03"},
        {id: "FRIENDSHIP", date: "30.07"},
        {id: "GIRLS", date: "11.10"},
        {id: "GROUNDHOG", date: "2.02"},
        {id: "HALLOWEEN", date: "31.10"},
        {id: "HARRY_POTTER", date: "2.05"},
        {id: "HELLO", date: "21.11"},
        {id: "HUGS", date: "21.01"},
        {id: "KISSING", date: "6.07"},
        {id: "MOUNTIN", date: "11.12"},
        {id: "MUSIC", date: "1.10"},
        {id: "OCEAN", date: "8.06"},
        {id: "PATRICK", date: "17.03"},
        {id: "PEACE", date: "21.09"},
        {id: "PENGUIN", date: "25.04"},
        {id: "PETS", date: "30.11"},
        {id: "PI", date: "14.03"},
        {id: "PIRATE", date: "19.09"},
        {id: "ROCK_N_ROLL", date: "13.04"},
        {id: "SCIENCE", date: "10.11"},
        {id: "SIBLINGS", date: "10.04"},
        {id: "STAR_WARS", date: "4.05"},
        {id: "TEA", date: "15.12"},
        {id: "THANK_YOU", date: "11.01"},
        {id: "TIGER", date: "29.07"},
        {id: "TOURISM", date: "27.09"},
        {id: "VALENTIN", date: "14.02"},
        {id: "WHALE", date: "19.02"},
        {id: "WIND", date: "15.06"},
        {id: "YOGA", date: "21.06"},
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

    static toCalendarEvents(year: number, translateService: TranslateService): Array<CalendarEvent> {
        return WorldHoliday.holidays.map(holiday => {
            return {
                start: WorldHoliday.toDate(holiday.date, year),
                end: WorldHoliday.toDate(holiday.date, year),
                title: translateService.instant(holiday.id)['TITLE'],
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