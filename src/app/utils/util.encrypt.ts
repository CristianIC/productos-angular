import CryptoJS from "crypto-js";

export const KEY_ENCRYPT = "870ab37afebfa098c19e45af4cbf3817ad2233648ca459330d0f34afa5861431";

export const encrypt  = (data: string): string => {
    return CryptoJS.AES.encrypt(data, KEY_ENCRYPT).toString();
}

export const decrypt = <T>(valueEncrypt: string): T | null => {
    const valueDecrypt = CryptoJS.AES.decrypt(valueEncrypt, KEY_ENCRYPT).toString(CryptoJS.enc.Utf8);
    if (!valueDecrypt) {
        return null;
    }
    return JSON.parse(valueDecrypt) as T;
}