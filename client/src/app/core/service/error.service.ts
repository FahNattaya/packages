import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new Subject<any>();

  constructor() { }

  getErrorObservable() {
    return this.errorSubject.asObservable();
  }

  handleError(errorMessage: any) {
    !['/subScription', '/customer-profile', '/blackListLimit', '/query-contract-mobile'].includes(errorMessage.url) &&
      this.errorSubject.next(errorMessage);
  }
}
