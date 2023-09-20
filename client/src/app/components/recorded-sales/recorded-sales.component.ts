import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { ICustomerData } from 'src/app/shared/model/customer.model';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getCustomerData } from 'src/app/store-ngrx/selectors/customer.selectors';
@Component({
  selector: 'app-recorded-sales',
  templateUrl: './recorded-sales.component.html',
  styleUrls: ['./recorded-sales.component.scss'],
})
export class RecordedSalesComponent implements OnInit {
  customerData$ = this.store.select(getCustomerData);
  customerData!: ICustomerData;
  mobileNo!: string;
  backPageUrl: string = '';
  textMainMenuButton: string = 'MAIN MENU';
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.getCustomerData();
    this.getMobileNo();
  }
  getMobileNo() {
    this.mobileNo = this.customerData?.mobileNo || '';
  }
  getCustomerData() {
    this.customerData$.subscribe((customer) => {
      if (customer) {
        this.customerData = customer;
      }
    });
  }

  gotoHomePage() {
    window.location.href = PathConstant.SALE_PORTAL_PAGE;
  }
}
