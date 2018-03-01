export class MagicNumberUtils {

  public static diffDays(date1: Date, date2: Date) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  public static diffHours(date1: Date, date2: Date) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600));
  }

  public static diffMinutes(date1: Date, date2: Date) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 60));
  }

  public static diffSeconds(date1: Date, date2: Date) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / 1000);
  }

  public static calcDateByYears(eventDate: Date, years: number): Date {
    let result = new Date(eventDate);
    if (eventDate < new Date) {
      result.setFullYear(eventDate.getFullYear() + years);
    } else {
        result.setFullYear(eventDate.getFullYear() - years);
    }
    return result;
  }

  public static calcDateByDays(eventDate: Date, daysAmount: number): Date {
    let result = new Date(eventDate);
    if (eventDate < new Date) {
      result.setDate(eventDate.getDate() + daysAmount);
    } else {
      result.setDate(eventDate.getDate() - daysAmount);
    }
    return result;
  }

  public static calcDateByHours(eventDate: Date, hoursAmount: number): Date {
    return this.calcDateByDays(eventDate, Math.floor(hoursAmount / 24));
  }

  public static calcDateByMinutes(eventDate: Date, minutesAmount: number): Date {
    return this.calcDateByDays(eventDate, Math.floor(minutesAmount / (24 * 60)));
  }

  public static calcDateBySeconds(eventDate: Date, secondsAmount: number): Date {
    return this.calcDateByDays(eventDate, Math.floor(secondsAmount / (24 * 3600)));
  }

}
