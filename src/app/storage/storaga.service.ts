import { Inject, Injectable, InjectionToken, PLATFORM_ID } from "@angular/core";
import { decrypt, encrypt } from "../utils/util.encrypt";
import { isPlatformBrowser } from "@angular/common";

interface IStorageValue<T> {
    value: T;
}

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});

@Injectable({
    providedIn: 'root'
})
export class StorageService implements Storage {

    get length(): number {
        return this.api.length;
    }

    constructor(@Inject(BROWSER_STORAGE) public api: Storage) {}


    clear(): void {
        this.api.clear();
    }

    getItem<T>(key: string): T | null;
    getItem<T>(key: string, otherwise: T): T;
    getItem<T>(key: string, otherwise?: T): T | null {

        const data: string | null = this.api.getItem(key);
        if (data !== null) {
            /*try {
                const storageValue = JSON.parse(data) as IStorageValue<T>;
                return storageValue.value;
            } catch (error) {
                return null;
            }*/
            return decrypt<T>(data);
        }
        if (otherwise) {
            return otherwise;
        }


        return null;
    }

    key(index: number): string | null {
        return this.api.key(index);
    }

    removeItem(key: string): void {
        this.api.removeItem(key);
    }

    setItem(key: string, value: unknown): void {
        let data = JSON.stringify(value);
        data = encrypt(data);
        this.api.setItem(key, data);
    }

}