import {Injectable} from '@angular/core';
import User from "../../domain/user";
import {Storage} from "@ionic/storage";

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
                return user == null ? null : new User(
                  user.firstName,
                  user.lastName,
                  user.birth
                );
            })
    }

    setUser(user: User): void {
        this.storage.set("user", user);
    }
}
