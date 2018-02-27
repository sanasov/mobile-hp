import {RoundNumber} from "../RoundNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";

export class RoundNumberSeconds extends RoundNumber {
  constructor(eventDate: Date) {
    super(eventDate);
    this.delta = 1000000;
  }
  diff(date1, date2): number {
    return MagicNumberUtils.diffSeconds(date1, date2);
  }
}
