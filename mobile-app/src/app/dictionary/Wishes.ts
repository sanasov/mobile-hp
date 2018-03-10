import {_} from 'underscore'
import HappyHoliday from "../domain/happy-holiday";
import {TranslateService} from "@ngx-translate/core";
import {holidayColors} from "./holidayColors";
import {CalendarEvent} from "angular-calendar";
import {Language} from "./language";

/**
 * Пожелания на др на разных языках
 * отдельно от локализации, т.к не хотелось делать связть между пожеланиями на разных языках, не нужно заниматься переводом.
 * Так получается проще
 */
export class Wishes {
    static en: Array<string> = [
        "It’s time to enjoy your favourite things and feel happy :)",
        "Let yourself do everything that you like most in life!",
        "May your special day be full of magical and unforgettable moments!",
        "I wish you a fun time and a lifelong happiness!",
        "May the dream that means most to you, start coming true this year!",
        "Smiles and laughter, joy and cheer!"
    ];
    static ru: Array<string> = [
        "Поздравляю! Это Ваш день :)",
        "Желаю хорошего настроения и ярких впечатлений :)",
        "С уникальным праздником!",
        "Поздравляю с необычным праздником!",
        "Мечтайте и живите с волшебным настроением!"
    ];

    worldHoliday: HappyHoliday;

    constructor(private locale: string) {
    }

    public getAny(): string {
        switch (this.locale.toUpperCase()) {
            case Language.RU.locale :
                return Wishes.ru[this.randomInt(0, Wishes.ru.length - 1)];
            default:
                return Wishes.en[this.randomInt(0, Wishes.en.length - 1)];
        }
    }

    private randomInt(min, max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

