import {RoundNumber} from "../RoundNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";

export class RoundNumberDays extends RoundNumber {

    constructor(eventDate: Date) {
        super(eventDate);
        this.delta = 1000;
    }


  diff(date1, date2): number {
    return MagicNumberUtils.diffDays(date1, date2);
  }
}
