import HappyHoliday from "../../domain/happy-holiday";
import HolidayEvent from "../../domain/holiday-event";
import * as _ from 'underscore'
import {RoundNumberDays} from "./days/RoundNumberDays";
import {RoundNumberMinutes} from "./minutes/RoundNumberMinutes";
import {RoundNumberHours} from "./hours/RoundNumberHours";
import {MagicNumber} from "./MagicNumber";
import {SameNumberDays} from "./days/SameNumberDays";
import {SameNumberMinutes} from "./minutes/SameNumberMinutes";
import {SameNumberSeconds} from "./seconds/SameNumberSeconds";
import {CalendarEvent} from "angular-calendar";
import {MagicNumberYears} from "./MagicNumberYears";

export class HappyHolidays {

    constructor(public hEvents: Array<HolidayEvent>, public birthday: Date, public year: number) {
        this.birthdayHolidays = this.birthDayHolidays();
        this.eventHolidays = _.uniq(
            _.flatten(this.hEvents.map(hEvent => this.eventHappyHolidays(hEvent)), true),
            false,
            (hp) => hp.title
        );

    }

    private eventHolidays: HappyHoliday[];
    private birthdayHolidays: HappyHoliday[];

    private magicNumbers(hEvent: HolidayEvent): MagicNumber[] {
        if (!hEvent.magicEvent) {
            return [];
        }
        return [
            new MagicNumberYears(hEvent),
            new RoundNumberDays(hEvent),
            new RoundNumberHours(hEvent),
            new RoundNumberMinutes(hEvent),
            new SameNumberDays(hEvent),
            new SameNumberMinutes(hEvent),
            new SameNumberSeconds(hEvent)
        ];
    }

    public all(): HappyHoliday[] {
        return _.union(this.birthdayHolidays, this.eventHolidays);
    }

    public getEventHolidays(): HappyHoliday[] {
        return this.eventHolidays;
    }

    public getBirthdayHolidays(): HappyHoliday[] {
        return this.birthdayHolidays;
    }

    public toCalendarEvents(): Array<CalendarEvent> {
        return this.all().map(hh => hh.toCalendarEvent());
    }

    private eventHappyHolidays(hEvent: HolidayEvent): HappyHoliday[] {
        return _.flatten(
            this.magicNumbers(hEvent)
                .map(magicNumber => magicNumber.happyHolidays(hEvent, this.year)),
            true);
    }

    private birthDayHolidays(): HappyHoliday[] {
        return _.flatten(
            this.magicNumbers(new HolidayEvent("", this.birthday, this.birthday, true))
                .map(magicNumber => magicNumber.birthdayHolidays(this.birthday, this.year)),
            true
        );
    }

}
