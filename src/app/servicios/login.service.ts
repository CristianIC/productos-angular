import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponseDTO } from '../dto/auth-response.dto';
import { Observable } from 'rxjs';
import { LoginInDTO } from '../dto/inputs/login.in.dto';
import { ResponseDTO } from '../dto/response.dto';
import { PathsApi } from '../utils/path-name';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly http = inject(HttpClient);

  constructor() { }

  public login(login: LoginInDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(PathsApi.PATH_AUTH_LOGIN, login);
  }

  public refresh(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(PathsApi.PATH_AUTH_REFREST_TOKEN, null);
  }

}
