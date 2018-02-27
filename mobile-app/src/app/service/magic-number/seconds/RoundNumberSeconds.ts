import {RoundNumber} from "../RoundNumber";

export class RoundNumberSeconds extends RoundNumber {
  constructor(eventDate: Date) {
    super(eventDate);
    this.delta = 1000000;
  }
}
