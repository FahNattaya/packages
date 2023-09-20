import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import {
  IConditionRespones,
  IContactRequest,
  IContactResponse,
  IGetCondition,
} from '../model/e-document.model';
import { SharedService } from './shared.service';
import { PointGroup } from 'signature_pad';

@Injectable({
  providedIn: 'root',
})
export class EDocumentService {
  sign: PointGroup[] = [];

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) {}

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  postContract(pms: IContactRequest): Observable<IContactResponse> {
    const url = this.shared.getUrl(`e-document/e-contract`);
    return this.http.post<IContactResponse>(url, pms);
  }

  getCondition(parameter: IGetCondition): Observable<IConditionRespones> {
    const url = this.shared.getUrl(`e-document/condition-code`);
    return this.http.post<any>(url, parameter).pipe(
      tap({
        next: (data) => this.dataSubject.next(data),
        error: (error) => console.error(error),
      })
    );
  }

  saveSign(sign: PointGroup[] | undefined): void {
    if (!sign) return;
    this.sign = sign;
  }

  loadSign(): PointGroup[] {
    return this.sign;
  }
}
