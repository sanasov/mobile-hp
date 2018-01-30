export class HolidayEngine {

  holidayDate(eventDate: Date, daysAmount: number) {
    let result = new Date();
    result.setDate(eventDate.getDate() + daysAmount);
    return result;
  }

  getRoundedNumbers(eventDate: Date) {

  }
}
