import {MagicNumberDays} from "./MagicNumberDays";

export class SameNumberDays extends MagicNumberDays{

  public numbers(): number[] {
    return [
      1111, 11111, 111111,
      2222, 22222, 222222,
      3333, 33333, 333333,
      4444, 44444, 444444,
      5555, 55555,
      6666, 66666,
      7777, 77777,
      8888, 88888,
    ];
  }

}
