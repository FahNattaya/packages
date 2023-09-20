import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrivilegeService {
  constructor(
    private http: HttpClient,
    private shared: SharedService,
  ) {}

  getPrivilege(reqBody: any, urlName: string): Observable<any> {
    const url = this.shared.getUrl(`privilege/${urlName}`);
    return this.http.post<any>(url, reqBody);
  }
}
