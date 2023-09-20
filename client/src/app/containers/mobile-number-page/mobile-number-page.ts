import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { CreateTransactionService } from 'src/app/shared/service/createTransaction.service';
import { saveMoblieNo } from 'src/app/store-ngrx/actions/customer.action';
import { AppState } from 'src/app/store-ngrx/app.state';

@Component({
  selector: 'app-mobile-number-page',
  templateUrl: './mobile-number-page.html',
  styleUrls: ['./mobile-number-page.scss'],
})
export class MobileNumberPageComponent implements OnInit {
  activeNextBtn: boolean = true;
  backUrl: string = PathConstant.VALIDATE_CUSTOMER_PAGE;
  back = 'BACK';
  mobileNoAndIdNoInput = new FormControl('');
  constructor(
     private router: Router,
     private store: Store<AppState> ,
     private createTransactionService: CreateTransactionService
     
     ) {}

  onNext() {
    this.store.dispatch(
      saveMoblieNo({ mobileNo: this.mobileNoAndIdNoInput.value! })
    );
    this.createTransactionService.onReserveStock();
    this.router.navigate([PathConstant.SERVICE_CARE]);
   
  }

  goback() {
    this.router.navigate([PathConstant.VALIDATE_CUSTOMER_PAGE]);
  }
  ngOnInit(): void {
    this.mobileNoAndIdNoInput.valueChanges.subscribe((e: string | null) => {
      if (e !== null && e?.length! === 10) {
        this.activeNextBtn = false;
      } else {
        this.activeNextBtn = true;
      }
    });
  }
}
