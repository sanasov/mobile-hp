import {Injectable} from "@angular/core";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Language} from "../dictionary/language";

@Injectable()
export class CommonSettings {

    public locale: String = Language.EN.locale;
    public weekStartsOn = () => this.locale === Language.EN.locale.toLowerCase() ? 0 : 1;
}
