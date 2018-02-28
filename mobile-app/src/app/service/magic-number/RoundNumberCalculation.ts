export class RoundNumberCalculation {

  constructor(public date: Date, public delta: number, public diff: Function) {
  }

  public numbers(year: number): number[] {
    let result = [];
    const firstDayOfYear = new Date(year, 0, 1);
    const lastDayOfYear = new Date(year, 11, 31);
    const diffDaysStartYear = this.diff(this.date, firstDayOfYear);
    const diffDaysEndYear = this.diff(this.date, lastDayOfYear);
    let currentRoundNumber = this.firstRoundNumberAfter(diffDaysStartYear);
    if (currentRoundNumber <= diffDaysEndYear) {
      result.push(this.nextRoundNumber(currentRoundNumber));
    }
    return result;
  }

  public firstFive(): number[] {
    let result = [];
    const firstRoundNumber = this.firstRoundNumberAfter(this.diff(new Date(), this.date));
    result.push(firstRoundNumber);
    for (let i = 0; i < 4; i++) {
      const currentRoundNumber = result[i];
      result.push(this.nextRoundNumber(currentRoundNumber));
    }
    return result;
  }

  private firstRoundNumberAfter(currentNumber: number): number {
    if (currentNumber >= 0 && currentNumber <= this.delta) {
      return this.delta;
    }
    const lengthNumber = (currentNumber + "").length;
    const firstNumerals = +(currentNumber + "")
      .substring(0, lengthNumber - (("" + this.delta).length - 1)); // zeros in delta
    return firstNumerals * this.delta === currentNumber ? currentNumber : (firstNumerals + 1) * this.delta;
  }

  private nextRoundNumber(currentRoundNumber: number): number {
    return currentRoundNumber + this.delta;
  }
}
