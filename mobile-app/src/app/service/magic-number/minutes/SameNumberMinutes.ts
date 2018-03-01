import {MagicNumberMinutes} from "./MagicNumberMinutes";

export class SameNumberMinutes extends MagicNumberMinutes{

  public numbers(): number[] {
    return [
              1111111, 11111111, 111111111,
              2222222, 22222222, 222222222,
              3333333, 33333333, 333333333,
              4444444, 44444444, 444444444,
      555555, 5555555, 55555555,
      666666, 6666666, 66666666,
      777777, 7777777, 77777777,
      888888, 8888888, 88888888,
      123456, 1234567, 12345678,
      7654321, 87654321
    ];
  }

}
