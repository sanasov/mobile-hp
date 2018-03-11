import {_} from 'underscore'
import HappyHoliday from "../domain/happy-holiday";
import {Language} from "./language";

/**
 * Подсказки названий событий
 * отдельно от локализации, т.к не хотелось делать связть между пожеланиями на разных языках, не нужно заниматься переводом.
 * Так получается проще
 */
export class EventHints {
    static en: Array<string> = [
        "Graduated high school",
        "First skydiving",
        "First time saw the sea",
        "Meeting with a childhood friend",
        "Last time visited my grandma",
        "Wedding",
        "Travelled abroad",
        "Last time was in the montains"
    ];
    static ru: Array<string> = [
        "Окончание школы",
        "Первый прыжок с парашютом",
        "Впервые увидел море",
        "Встреча с подругой детства",
        "Был в гостях у бабушки",
        "Свадьба",
        "Побывал заграницей",
        "Последний раз был в горах"
    ];

    constructor(private locale: string) {
    }

    public hints(): Array<string> {
        return EventHints[this.locale.toLowerCase()];
    }


}

