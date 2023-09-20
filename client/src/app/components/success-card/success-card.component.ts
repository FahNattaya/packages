import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store-ngrx/app.state';
import { getUserPaymentType } from '../../store-ngrx/selectors/payments.selectors';
import { getSelectProduct} from '../../store-ngrx/selectors/product.selectors';
import { getCustomerData } from '../../store-ngrx/selectors/customer.selectors';
import { getSelectedMobileCare } from 'src/app/store-ngrx/selectors/service-care.selectors';
import { IProductDetail } from 'src/app/shared/model/product.model';

@Component({
  selector: 'app-success-card',
  templateUrl: './success-card.component.html',
  styleUrls: ['./success-card.component.scss']
})
export class SuccessCardComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  status = "ผ่อนชำระ";
  mobileNo: string | undefined = '';
  selectedProduct: IProductDetail | undefined;
  productDetailData$ = this.store.select(getSelectProduct);
  paymentData$ = this.store.select(getUserPaymentType);
  serviceCareData$ = this.store.select(getSelectedMobileCare);
  customerData$ = this.store.select(getCustomerData);
  
  ngOnInit(): void {
  
  }

}
