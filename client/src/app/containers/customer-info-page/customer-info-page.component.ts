import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PathConstant } from 'src/app/shared/constant/path.constant';

import {
  ICustomerData,
  IIdCardAddress,
} from 'src/app/shared/model/customer.model';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getCustomerData } from 'src/app/store-ngrx/selectors/customer.selectors';
import { LocationService } from 'src/app/shared/service/location.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-customer-info-page',
  templateUrl: './customer-info-page.component.html',
  styleUrls: ['./customer-info-page.component.scss'],
})
export class CustomerInfoPageComponent implements OnInit {
  customerData?: ICustomerData;
  backPageUrl: string = '/validate-customer';
  customerProfile?: any;
  zipCode?: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  getCustomerInfo() {
    this.store
      .select(getCustomerData)
      .pipe(take(1))
      .subscribe((customerData) => {
        this.customerData = customerData;
      });

    const idCardAddress: IIdCardAddress | undefined =
      this.customerData?.customerAddress;

    this.locationService
      .getZipCode(idCardAddress?.tumbol, idCardAddress?.amphur)
      ?.subscribe((county: any) => {
        this.zipCode = county.ZIPCODE;
      });

    this.customerProfile = {
      customerName: this.customerData?.customerName || '',
      identityNo: this.customerData?.idCardNo || '',
      customerAddress: `
        ${idCardAddress?.engFlag || ''}
        ${idCardAddress?.houseNo || ''}
        ${idCardAddress?.moo || ''}
        ${idCardAddress?.mooban || ''}
        ${idCardAddress?.building || ''}
        ${idCardAddress?.floor || ''}
        ${idCardAddress?.room || ''}
        ${idCardAddress?.soi || ''}
        ${idCardAddress?.street || ''}
        ${idCardAddress?.tumbol || ''}
        ${idCardAddress?.amphur || ''}
        ${idCardAddress?.province || ''}
        ${this.zipCode || ''}
     `,
      imageReadSmartCard: this.customerData?.imageReadSmartCard,
    };
  }

  onClick() {
    if (this.customerData?.isMobileAis && !this.customerData?.mobileNo) {
      this.router.navigate([PathConstant.LIST_NUMBER]);
    }
    if (!this.customerData?.isMobileAis && this.customerData?.mobileNo) {
      this.router.navigate([PathConstant.SERVICE_CARE]);
    }
    if (!this.customerData?.isMobileAis && !this.customerData?.mobileNo) {
      this.router.navigate([PathConstant.MOBILE_NUMBER_PAGE]);
    }
  }
}
