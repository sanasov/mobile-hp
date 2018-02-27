import {RoundNumber} from "../RoundNumber";

export class RoundNumberMinutes extends RoundNumber {
  constructor(eventDate: Date) {
    super(eventDate);
    this.delta = 1000000;
  }
}
