import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  secretKey = "Welcome to my form!";

  constructor() { }

  encryptData(data: any ) {
    return encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString());
  }

  decryptData(data : any) {
    let decryptData= CryptoJS.AES.decrypt(decodeURIComponent(data), this.secretKey); 
    return JSON.parse(decryptData.toString(CryptoJS.enc.Utf8));
  }
}
