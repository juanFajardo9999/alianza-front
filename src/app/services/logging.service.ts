import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  log(message: string, data?: any): void {
    console.log(`[LOG]: ${message}`, data || '');
  }

  warn(message: string, data?: any): void {
    console.warn(`[WARN]: ${message}`, data || '');
  }

  error(message: string, data?: any): void {
    console.error(`[ERROR]: ${message}`, data || '');
  }
}
