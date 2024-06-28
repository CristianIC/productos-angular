import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorResponseInterceptor } from './interceptors/error-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor, ErrorResponseInterceptor])
    ), 
    provideAnimationsAsync()
  ]
};
