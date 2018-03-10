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
        "Мечтайте и живите с волшебным настроением!",
        "Поздравляю с необычным праздником!",
        "С уникальным праздником!"
    ];

    constructor(private locale: string) {
    }

    public hints(): Array<string> {
        return EventHints[this.locale.toLowerCase()];
    }


}

