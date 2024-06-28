import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, catchError, concatMap, finalize, throwError } from 'rxjs';
import { LoginService } from '../servicios/login.service';
import { ResponseDTO } from '../dto/response.dto';
import { AuthResponseDTO } from '../dto/auth-response.dto';
import { AuthService } from '../servicios/auth.service';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError( (error: HttpErrorResponse) => {
      if(error.status === HttpStatusCode.Forbidden) {

        authService.isRefreshingToken = true;

        return loginService.refresh().pipe(
          finalize(() => (authService.isRefreshingToken = false)),
          concatMap( (responseDTO: ResponseDTO) => {
            const authResponseDTO: AuthResponseDTO = responseDTO.data;
            authService.addAuthResponseDTO(authResponseDTO);
            const requestClone = authService.addTokenToHeader(req);
            return next(requestClone);
          } ),
          catchError( () => {
            authService.logout();
            return EMPTY;
          })
        )
      }

      return throwError(()=> error);
    })
  );
};
