import { Injectable, inject } from '@angular/core';
//import { LocalStorageService } from '../storage/local-storage.service';
import { AuthResponseDTO } from '../dto/auth-response.dto';
import { HttpRequest } from '@angular/common/http';
import { StorageService } from '../storage/storaga.service';
import { PathsApi } from '../utils/path-name';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageService = inject(StorageService);
  private readonly DATA_USER = "data-user";

  private _isRefreshingToken = false;

  private router = inject(Router);

  get isRefreshingToken() {
    return this._isRefreshingToken;
  }

  set isRefreshingToken(value: boolean) {
    this._isRefreshingToken = value;
  }

  constructor() { }

  public addTokenToHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const accessToken = this.getTokenLocalStorage();
    const refreshToken = this.getRefreshTokenLocalStorage();
    const token = request.url === PathsApi.PATH_AUTH_REFREST_TOKEN ? refreshToken : accessToken;
    return request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  public addAuthResponseDTO(authResponseDTO: AuthResponseDTO): void {
    this.localStorageService.setItem(this.DATA_USER, authResponseDTO);
  }

  public getTokenLocalStorage(): string | null {
    const dataUser = this.getDataUser();
    if (dataUser && dataUser.token) {
      return dataUser.token;
    }
    return null;
  }

  public getRefreshTokenLocalStorage(): string | null {
    const dataUser = this.getDataUser();
    if (dataUser && dataUser.refreshToken) {
      return dataUser.refreshToken;
    }
    return null;
  }

  public getDataUser(): AuthResponseDTO | null {
    return this.localStorageService.getItem<AuthResponseDTO>(this.DATA_USER);
  }

  public isAuthenticate(): boolean {
    if (!this.getTokenLocalStorage()) {
      return false;
    }
    const refreshToken = this.getRefreshTokenLocalStorage();
    if (!refreshToken) {
      return false;
    }
    const payload = JSON.parse(atob(refreshToken.split('.')[1]));
    const expiredTimeRfreshToken = payload.exp * 1000;
    return Date.now() < expiredTimeRfreshToken;
  }

  public logout(): void {
    this.limpiarTokenStorage();
    this.router.navigateByUrl('/login');
  }

  public limpiarTokenStorage(): void {
    this.localStorageService.clear();
  }

}
