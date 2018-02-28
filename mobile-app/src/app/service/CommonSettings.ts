import {Injectable} from "@angular/core";
import {Language} from "../dictionary/language";
import User from "../domain/user";

@Injectable()
export class CommonSettings {

    public locale: String = Language.EN.locale;
    public weekStartsOn = () => this.locale === Language.EN.locale.toLowerCase() ? 0 : 1;
    public user: User = null;
}
