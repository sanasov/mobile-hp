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

export class HappyHolidays {

  constructor(public hEvents: Array<HolidayEvent>, public birthDay: Date, public year: number) {
  }

  private magicNumbers(hEvent: HolidayEvent): MagicNumber[] {
    return [
      new RoundNumberDays(hEvent),
      new RoundNumberHours(hEvent),
      new RoundNumberMinutes(hEvent),
      new SameNumberDays(hEvent),
      new SameNumberMinutes(hEvent),
      new SameNumberSeconds(hEvent)
    ];
  }

  public all(): HappyHoliday[] {
    let eventHappyHolidays = _.flatten(this.hEvents.map(hEvent => this.happyHolidays(hEvent)), true);
    let birthdayHappyHolidays = _.flatten(this.hEvents.map(hEvent => this.birthDayHolidays(hEvent)), true);
    return _.union(eventHappyHolidays, birthdayHappyHolidays);
  }


  private happyHolidays(hEvent: HolidayEvent): HappyHoliday[] {
    return _.flatten(this.magicNumbers(hEvent).map(magicNumber => magicNumber.happyHolidays(hEvent, this.year)), true);
  }

  private birthDayHolidays(hEvent: HolidayEvent): HappyHoliday[] {
    return _.flatten(this.magicNumbers(hEvent).map(magicNumber => magicNumber.birthdayHolidays(hEvent, this.year)), true);
  }

}
