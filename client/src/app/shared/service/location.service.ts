import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocationName } from '../model/location.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  getNearByLocation(
    filterType: String,
    locationCode: String,
    locationType: String
  ): Observable<any> {
    const url = this.shared.getUrl(
      `location/another?filterType=${filterType}&locationCode=${locationCode}&locationType=${locationType}`
    );
    return this.http.get<any>(url);
  }

  getLocationName(locationCode: string): Observable<ILocationName> {
    const url = this.shared.getUrl(
      `location/getLocationName?locationCode=${locationCode}`
    );
    return this.http.get<ILocationName>(url);
  }

  getQueueTypeLocation(): Observable<any> {
    const url = this.shared.getUrl(`location/check-queue-location`);
    return this.http.get<any>(url);
  }

  getProvinces(zipCode?: string): Observable<any> {
    const data = zipCode || '';
    return this.http.get(
      `/api/device-sales/v1/location/get-provinces?zipCode=${data}`
    );
  }

  getZipCode(tumbol?: string, city?: string): Observable<any> {
    return this.http.get(
      `/api/device-sales/v1/location/zip-code?tumbol=${tumbol}?city=${city}`
    );
  }
}
