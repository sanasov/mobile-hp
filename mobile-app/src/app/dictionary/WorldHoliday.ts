export class WorldHoliday {
    holidays: Array<{ title: string, date: string }> = [
        {title: "ARCHAEOLOGIST", date: "28.02"},
        {title: "BLONDE", date: "14.07"},
        {title: "BOSS", date: "15.07"},
        {title: "CHOCOLATE", date: "16.07"},
        {title: "CHRISTMAS", date: "25.12"},
        {title: "CHRISTMAS", date: "7.01"},
        {title: "FAMILY", date: "18.07"},
        {title: "FOOTBALL", date: "19.07"},
        {title: "FRIENDS", date: "10.07"},
        {title: "HALLOWEEN", date: "31.10"},
        {title: "HUGS", date: "12.02"},
        {title: "KIT", date: "13.02"},
        {title: "LAUGHT", date: "14.02"},
        {title: "MEN", date: "15.02"},
        {title: "MOUNTIN", date: "16.02"},
        {title: "MOVIE", date: "17.02"},
        {title: "MUSEUM", date: "18.02"},
        {title: "NOTABAK", date: "19.02"},
        {title: "NURSE", date: "20.02"},
        {title: "PI", date: "21.02"},
        {title: "POLOTENCE", date: "22.02"},
        {title: "ROCK_N_ROLL", date: "23.02"},
        {title: "SLEEPCAT", date: "24.02"},
        {title: "SUN", date: "25.02"}
    ];
    date: Date;

    constructor(date: Date) {
        this.date = date;
    }

    get(): String {
        const dayMonth = this.date.getDate() + "." + (this.date.getMonth() < 9 ? "0" : "") + (this.date.getMonth() + 1)
        const holiday = this.holidays.filter(h => h.date === dayMonth)[0];
        return holiday ? holiday.title : "";
    }
}