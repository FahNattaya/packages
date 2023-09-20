import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(private shared: SharedService, private http: HttpClient) {}

  genQueueZ(reqBody: any): Observable<any> {
    const url = this.shared.getUrl(`queue/gen-queue-z`);
    return this.http.post<any>(url, reqBody);
  }
}
