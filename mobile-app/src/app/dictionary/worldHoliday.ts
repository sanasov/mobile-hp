export class WorldHoliday {
    holidays: [] = [
        {date: "13.07", title: "ARCHAEOLOGIST"},
        {date: "14.07", title: "BLONDE"},
        {date: "15.07", title: "BOSS"},
        {date: "16.07", title: "CHOCOLATE"},
        {date: "17.07", title: "CHRISTMAS"},
        {date: "18.07", title: "FAMILY"},
        {date: "19.07", title: "FOOTBALL"},
        {date: "10.07", title: "FRIENDS"},
        {date: "11.02", title: "HALLOWEEN"},
        {date: "12.02", title: "HUGS"},
        {date: "13.02", title: "KIT"},
        {date: "14.02", title: "LAUGHT"},
        {date: "15.02", title: "MEN"},
        {date: "16.02", title: "MOUNTIN"},
        {date: "17.02", title: "MOVIE"},
        {date: "18.02", title: "MUSEUM"},
        {date: "19.02", title: "NOTABAK"},
        {date: "20.02", title: "NURSE"},
        {date: "21.02", title: "PI"},
        {date: "22.02", title: "POLOTENCE"},
        {date: "23.02", title: "ROCK_N_ROLL"},
        {date: "24.02", title: "SLEEPCAT"},
        {date: "25.02", title: "SUN"}
    ];
    date: Date;

    constructor(public date: Date) {
        this.date = date;
    }

    public holiday(): String {
        const holiday = this.holidays.filter(h => h.date === this.date.format('dd-mm'))[0];
        return holiday ? holiday.title : "";
    }
}