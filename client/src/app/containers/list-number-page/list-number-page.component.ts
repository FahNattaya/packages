import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ErrorService } from 'src/app/core/service/error.service';
import { TokenService } from 'src/app/core/service/token.service';
import { messageConstant } from 'src/app/shared/constant/message.constant';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { IMobileListNumberByIdCardNumber } from 'src/app/shared/model/customer.model';
import { CreateTransactionService } from 'src/app/shared/service/createTransaction.service';
import { loadCartList } from 'src/app/store-ngrx/actions/cart.action';
import { saveMoblieNo } from 'src/app/store-ngrx/actions/customer.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getCartList } from 'src/app/store-ngrx/selectors/cart.selectors';
import {
  getCustomerData,
  getMobileListByIdCardNo,
} from 'src/app/store-ngrx/selectors/customer.selectors';

@Component({
  selector: 'app-list-number-page',
  templateUrl: './list-number-page.component.html',
  styleUrls: ['./list-number-page.component.scss'],
})
export class ListNumberPageComponent implements OnInit {

  backUrl: string = PathConstant.VALIDATE_CUSTOMER_PAGE;
  mobileListInitial = {
    prepaidMobileList: [],
    postpaidMobileList: [],
  };
  activePill = 1;
  checkType: string = '';
  listNumber$ = this.store.select(getCustomerData);
  allNumber: IMobileListNumberByIdCardNumber = this.mobileListInitial;
  disabledButtonNext: boolean = true;
  mobileNo: string = ''

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private errorService: ErrorService,
    private tokenService: TokenService,
    private createTransactionService: CreateTransactionService
  ) { }

  ngOnInit(): void {
    this.store.select(getMobileListByIdCardNo).subscribe((mobileList) => {
      this.allNumber = mobileList ?? this.mobileListInitial;
    });
  }

  onNext() {
    this.store.dispatch(saveMoblieNo({ mobileNo: this.mobileNo }))
    this.store.dispatch(
      loadCartList({
        mobileNo: this.mobileNo,
        locationCode: this.tokenService.getDataToken().locationCode,
      })
    );
    this.checkProductList();
  }

  checkProductList() {
    const loadingSub = this.store.select(getCartList).subscribe((cartList) => {
      if (cartList) {
        loadingSub.unsubscribe();
        if (cartList?.length >= 1) {
          this.errorService.handleError({
            customMessage: messageConstant.ERROR_CART_LIST_LIMIT
          });
          return;
        }
        this.createTransactionService.onReserveStock();
        this.router.navigate([PathConstant.SERVICE_CARE]);
      }
    })
  }

  setActivePill(pill: number) {
    this.activePill = pill;
  }

  onEmitMoblieNo(mobileNo: string) {
    this.disabledButtonNext = !mobileNo;
    this.mobileNo = mobileNo
  }

}
