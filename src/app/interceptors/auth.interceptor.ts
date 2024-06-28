import { HttpInterceptorFn } from '@angular/common/http';
import { PathsApi } from '../utils/path-name';
import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { EMPTY } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (req.url === PathsApi.PATH_AUTH_LOGIN) {
    return next(req);
  }

  if (req.url === PathsApi.PATH_AUTH_REFREST_TOKEN) {
    const requestClone = authService.addTokenToHeader(req);
    return next(requestClone);
  }

  if (authService.isRefreshingToken) {
    return EMPTY;
  }

  if (!authService.isAuthenticate()) {
    authService.logout();
    return EMPTY;
  }

  const requestClone = authService.addTokenToHeader(req);
  return next(requestClone);
};
