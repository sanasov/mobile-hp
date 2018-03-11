import {MagicNumberSeconds} from "./MagicNumberSeconds";
import {HolidayType} from "../../../dictionary/holidayType";

export class SameNumberSeconds extends MagicNumberSeconds{

  public numbers(): number[] {
    return [
                111111111, 1111111111,
                222222222, 2222222222,
      33333333, 333333333, 3333333333,
      44444444, 444444444, 4444444444,
      55555555, 555555555, 5555555555,
      66666666, 666666666, 6666666666,
      77777777, 777777777, 7777777777,
      88888888, 888888888, 8888888888,
      12345678, 1234567890, 987654321,
      9876543210
    ];
  }

    public holidayType(): HolidayType {
        return HolidayType.SAME;
    }

}
