import { Injectable, InjectionToken, OnInit, PLATFORM_ID } from '@angular/core';
import { StorageService } from './storaga.service';
import { isPlatformBrowser } from '@angular/common';

/*@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends StorageService{

  constructor() {
    super(window.localStorage);
  }

}*/