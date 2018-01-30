import {CalendarEvent} from "angular-calendar";

export class HolidayEngine {

    pi: string = "3.14159265359";
    exp: string = "2.71828182846";
    colors: any = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
        }
    };

    hpEvents: Array<{ title: string, date: string }>;

    constructor(hpEvents: Array<{ title: string, date: string }>) {
        this.hpEvents = hpEvents;
    }

    public getCalendarEvents(year: number): Array<CalendarEvent> {
        let calendarEvents: CalendarEvent[] = [];
        this.hpEvents.forEach(hpEvent => {
            calendarEvents = calendarEvents.concat(this.getCalendarEventsByMagicNumbers(hpEvent, year));
        });
        return calendarEvents
    }

    private getCalendarEventsByMagicNumbers(hpEvent, year) {
        let eventDate = new Date(hpEvent.date);
        return this.getMagicNumbersCorrespondYear(eventDate, year).map(magicNumber => {
            return {
                start: this.holidayDate(eventDate, magicNumber.daysAmount),
                end: this.holidayDate(eventDate, magicNumber.daysAmount),
                title: magicNumber.title + "\n" + hpEvent.title + " days: " + magicNumber.daysAmount,
                color: this.colors.red,
                actions: null
            }
        });
    }

    private getMagicNumbersCorrespondYear(eventDate: Date, year: number): Array<{ daysAmount: number, title: string }> {
        const firstDayOfYear = new Date(year, 0, 1);
        const lastDayOfYear = new Date(year, 11, 31);
        const diffDaysStartYear = this.diffDays(eventDate, firstDayOfYear);
        const diffDaysEndYear = this.diffDays(eventDate, lastDayOfYear);
        let magicNumbers: Array<{ daysAmount: number, title: string }> = [];
        for (let i = diffDaysStartYear; i <= diffDaysEndYear; i++) {
            if (this.isRounded(i)) {
                magicNumbers.push({daysAmount: i, title: "Круглая дата"});
            } else if (this.allNumbersAreTheSame(i)) {
                magicNumbers.push({daysAmount: i, title: "Из одной цифры"});
            } else if (i >= Math.pow(2, 10) && this.isTwoInDegree(i)) {
                magicNumbers.push({daysAmount: i, title: "2 в степени"});
            } else if (i >= Math.pow(3, 7) && this.isThreeInDegree(i)) {
                magicNumbers.push({daysAmount: i, title: "3 в степени"});
            } else if (this.isFactorial(i)) {
                magicNumbers.push({daysAmount: i, title: "Факториал"});
            } else if (this.isPi(i)) {
                magicNumbers.push({daysAmount: i, title: "Pi! pi = ${this.pi}"});
            } else if (this.isExp(i)) {
                magicNumbers.push({daysAmount: i, title: "Экспонента! e = ${this.exp}"});
            }
        }
        return magicNumbers;
    }

    private holidayDate(eventDate: Date, daysAmount: number) {
        let result = new Date(eventDate);
        result.setDate(eventDate.getDate() + daysAmount);
        return result;
    }

    private diffDays(date1: Date, date2: Date) {
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    private isRounded(daysAmount: number) {
        if (daysAmount <= 1000) {
            return daysAmount % 100 === 0;
        } else if (daysAmount <= 1500) {
            return daysAmount % 500 === 0;
        }
        return daysAmount % 1000 === 0;
    }

    private allNumbersAreTheSame(daysAmount: number) {
        const daysAmountString = daysAmount.toString();
        for (let i = 1; i < daysAmountString.length; i++) {
            if (daysAmountString[i] != daysAmountString[0]) {
                return false;
            }
        }
        return true;
    }

    private isPi(daysAmount: number) {
        const daysAmountString = daysAmount.toString();
        return this.pi.replace(".", "").substr(0, daysAmountString.length) === daysAmountString;
    }

    private isExp(daysAmount: number) {
        const daysAmountString = daysAmount.toString();
        return this.exp.replace(".", "").substr(0, daysAmountString.length) === daysAmountString;
    }

    private isTwoInDegree(i: number) {
        while (i > 1) {
            if (i % 2 !== 0) {
                return false;
            }
            i = i / 2;
        }
        return i === 1;
    }

    private isThreeInDegree(i: number) {
        while (i > 1) {
            if (i % 3 !== 0) {
                return false;
            }
            i = i / 3;
        }
        return i === 1;
    }

    private isFactorial(i: number): boolean {
        const sevenFact = 5040;
        return i === sevenFact || i === sevenFact * 8 || i === sevenFact * 8 * 9 || i === sevenFact * 8 * 9 * 10;
    }
}
