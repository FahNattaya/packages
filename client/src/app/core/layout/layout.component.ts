import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../store-ngrx/app.state';
import { Store } from '@ngrx/store';
import { getCustomerData } from '../../store-ngrx/selectors/customer.selectors';
import { ICustomerData } from 'src/app/shared/model/customer.model';
@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @Input() backUrl: string = '';
  @Input() isShowFooter: boolean = false;
  @Input() titlePageName: string = '';
  @Input() isShowIconCart: boolean = true;
  @Input() isShowIconBack: boolean = true;
  @Input() isShowCustomerDetail: boolean = true;

  accountData$ = this.store.select(getCustomerData);
  customer: ICustomerData;

  constructor(private store: Store<AppState>) {
    this.customer = {
      title: '',
      billingSystem: '',
      customerName: '',
      birthday: '',
      mobileNo: '',
      serviceYear: '',
      chargeType: '',
      subscriptionState: '',
      idCardNo: '',
      idCardType: '',
      isMobileAis: false,
      billLanguage: '',
      accountSubCat: '',
      gender: '',
      exprireDate: '',
      engFlag: '',
    };
  }

  ngOnInit(): void {
    this.updateCustomerAccount();
  }

  updateCustomerAccount(): void {
    this.accountData$
      .subscribe((comingData) => {
        if (comingData) {
          this.customer = comingData;
        } else {
          this.isShowCustomerDetail = false;
        }
      })
      .unsubscribe();
  }
}
