import {Injectable} from '@angular/core';
import User from "../../domain/user";
import {Storage} from "@ionic/storage";
import HolidayEvent from "../../domain/holiday-event";

@Injectable()
export class StorageRepositoryProvider {

    constructor(public storage: Storage) {
        console.log('Hello StorageProvider Provider');
    }

    // getPhoneLanguage(): Promise<Language> {
    //     return this.storage.get("phone-language").then((phoneLanguage: string) => {
    //         return Language[phoneLanguage];
    //     });
    // }
    //
    // setPhoneLanguage(value: Language): void {
    //     this.storage.set("phone-language", value);
    // }

    getUser(): Promise<User> {
        return this.storage.get("user").then((user: User) => {
                return user == null ? new User("","", null) : User.create(user);
            })
    }

    setUser(user: User): void {
        this.storage.set("user", user);
    }


  getHolidayEvents(): Promise<HolidayEvent[]> {
    return this.storage.get("events").then((events: HolidayEvent[]) => {
      return !events ? [] : events.map(event => event == null ? new HolidayEvent("",null, null,false ) : HolidayEvent.create(event));
    });
  }

    setHolidayEvents(events: HolidayEvent[]): void {
        this.storage.set("events", events);
  }
}
