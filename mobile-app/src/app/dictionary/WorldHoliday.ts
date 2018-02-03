export class WorldHoliday {
    holidays: Array<{ title: string, date: string }> = [
        {title: "ARCHAEOLOGIST", date: "15.08"},
        {title: "BLONDE", date: "31.05"},
        {title: "BOSS", date: "16.10"},
        {title: "CHOCOLATE", date: "11.07"},
        {title: "CHRISTMAS", date: "25.12"},
        {title: "CHRISTMAS", date: "7.01"},
        {title: "FAMILY", date: "15.05"},
        {title: "FOOTBALL", date: "10.12"},
        {title: "FRIENDS", date: "30.07"},
        {title: "HALLOWEEN", date: "31.10"},
        {title: "HUGS", date: "21.01"},
        {title: "KIT", date: "19.02"},
        {title: "LAUGHT", date: "11.04"},
        {title: "MEN", date: "19.11"},
        {title: "MOUNTIN", date: "11.12"},
        {title: "MOVIE", date: "28.12"},
        {title: "MUSEUM", date: "18.05"},
        {title: "NOTABAK", date: "31.05"},
        {title: "NURSE", date: "12.05"},
        {title: "PI", date: "14.03"},
        {title: "POLOTENCE", date: "25.05"},
        {title: "ROCK_N_ROLL", date: "13.04"},
        {title: "SLEEPCAT", date: "1.05"},
        {title: "SUN", date: "3.05"}
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