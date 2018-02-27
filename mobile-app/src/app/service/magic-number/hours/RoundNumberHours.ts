import {RoundNumber} from "../RoundNumber";

export class RoundNumberHours extends RoundNumber {
  constructor(eventDate: Date) {
    super(eventDate);
    this.delta = 10000;
  }
}
