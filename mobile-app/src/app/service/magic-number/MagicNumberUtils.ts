
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

}
