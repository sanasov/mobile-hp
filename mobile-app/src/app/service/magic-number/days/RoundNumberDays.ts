import {RoundNumber} from "../RoundNumber";

export class RoundNumberDays extends RoundNumber{

    constructor(eventDate: Date) {
        super(eventDate);
        this.delta = 1000;
    }

}
