import {RoundNumber} from "../RoundNumber";
import {MagicNumberUtils} from "../MagicNumberUtils";

export class RoundNumberHours extends RoundNumber {
  constructor(eventDate: Date) {
    super(eventDate);
    this.delta = 10000;
  }
  diff(date1, date2): number {
    return MagicNumberUtils.diffHours(date1, date2);
  }
}
