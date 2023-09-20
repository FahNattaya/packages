import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, firstValueFrom, take } from 'rxjs';
import { CartService } from 'src/app/shared/service/cart.service';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { SweetAlert } from 'src/app/shared/alert/sweet-alert';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { loadQueueLocation } from 'src/app/store-ngrx/actions/location.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import {
  getCustomerData,
  getSelectedAddress,
} from 'src/app/store-ngrx/selectors/customer.selectors';
import { getQueueType } from 'src/app/store-ngrx/selectors/location.selectors';
import { getUserData } from 'src/app/store-ngrx/selectors/seller.selectors';
import { saveQueue } from 'src/app/store-ngrx/actions/queue.action';
import { getContractImageData } from 'src/app/store-ngrx/selectors/e-document.selectors';
import { IIdCardAddress } from 'src/app/shared/model/customer.model';
import { SharedService } from 'src/app/shared/service/shared.service';
import { QueueService } from 'src/app/shared/service/queue.service';
import { getOutChCustDataFlow } from 'src/app/store-ngrx/selectors/mc-config.selectors';

@Component({
  selector: 'app-gen-queue-page',
  templateUrl: './gen-queue-page.component.html',
  styleUrls: ['./gen-queue-page.component.scss'],
})
export class GenQueuePageComponent implements OnInit {
  genQueueForm: FormGroup;
  customerData: any = {};
  userData: any = {};
  queueType$ = this.store.select(getQueueType);
  customerData$ = this.store.select(getCustomerData);
  userData$ = this.store.select(getUserData);
  imageContract$ = this.store.select(getContractImageData);
  outChSalesFlow$ = this.store.select(getOutChCustDataFlow);

  textCancelButton: string = 'BACK';
  backPageUrl = '';
  transaction: any = {};
  imageContract: string = '';
  destroyed$: Subject<void> = new Subject();
  alert: SweetAlert = new SweetAlert();
  isLoading: boolean = false;
  selectedAddress?: IIdCardAddress;
  flow: string = '';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private paymentService: PaymentService,
    private sharedService: SharedService,
    private queueService: QueueService
  ) {
    this.genQueueForm = this.formBuilder.group({
      mobileNo: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      queueNo: ['', [Validators.required, Validators.pattern(/^[A-Z]\d{3}$/)]],
    });
  }
  async ngOnInit(): Promise<void> {
    this.store
      .select(getSelectedAddress)
      .pipe(take(1))
      .subscribe((address) => {
        this.selectedAddress = address;
      });
    this.userData = (await firstValueFrom(this.userData$)) || {};
    this.store.dispatch(loadQueueLocation());
    this.customerData = (await firstValueFrom(this.customerData$)) || {};
    this.flow = (await firstValueFrom(this.outChSalesFlow$)) || '';
    this.getTransaction(this.customerData.mobileNo);
  }
  async getTransaction(mobileNo: string) {
    const user = await firstValueFrom(this.store.select(getUserData));
    this.transaction = await firstValueFrom(
      this.cartService.getCartList(mobileNo, user?.locationCode || '')
    );
    if (this.transaction?.main_promotion?.campaign?.conditionCode) {
      this.backPageUrl = PathConstant.SIGN_CONTRACT_PAGE;
    } else {
      this.backPageUrl = PathConstant.PAYMENT_METHOD;
    }
  }

  async onNext() {
    this.isLoading = true;
    this.imageContract = (await firstValueFrom(this.imageContract$)) || '';
    // let queueNo: any;
    if (this.genQueueForm.get('mobileNo')?.value) {
      const smsResponse = await firstValueFrom(
        this.paymentService.sendSMSQmatic(
          this.genQueueForm.get('mobileNo')?.value
        )
      );
      if (smsResponse.data && smsResponse.data.queueNo) {
        this.store.dispatch(saveQueue({ queueNo: smsResponse.data.queueNo }));
        const transaction = this.transaction[0];
        const reqOrderlist = this.sharedService.onMapReqCreateOrderList(
          transaction,
          this.selectedAddress,
          this.flow,
          smsResponse.data.queueNo
        );
        this.createOrderlist(reqOrderlist, transaction.transactionId);
      } else {
        this.isLoading = true;
        this.alert.swalStandardError(
          smsResponse.resultDescription.match(/\[(.*?)\]/)[1],
          smsResponse.developerMessage
        );
      }
    } else {
      const transaction = this.transaction[0];
      const reqOrderlist = this.sharedService.onMapReqCreateOrderList(
        transaction,
        this.selectedAddress,
        this.flow,
        this.genQueueForm.get('queueNo')?.value
      );
      this.createOrderlist(reqOrderlist, transaction.transactionId);
    }
  }

  onBack() {
    this.router.navigate([this.backPageUrl]);
  }

  async onSkip() {
    const queueResponse = await firstValueFrom(
      this.queueService.genQueueZ(this.userData.locationCode)
    );
    if (queueResponse.data && queueResponse.data.queueZ) {
      this.store.dispatch(saveQueue({ queueNo: queueResponse.data.queueZ }));
      const transaction = this.transaction[0];
      const reqOrderlist = this.sharedService.onMapReqCreateOrderList(
        transaction,
        this.selectedAddress,
        this.flow,
        queueResponse.data.queueZ
      );
      this.createOrderlist(reqOrderlist, transaction.transactionId);
    }
  }
  async createOrderlist(reqOrderList: any, transactionId: string) {
    const response = await firstValueFrom(
      this.paymentService.createOrderList(reqOrderList)
    );
    this.store.dispatch(saveQueue({ queueNo: response.queueNo }));
    const reqUpdateTrans = {
      'DATA.queue.queueNo': String(response.queueNo || ''),
      'DATA.status': {
        code: '002',
        description: 'Waiting Payment',
      },
    };
    if (response && response.queueNo) {
      const responseSharedTran = await firstValueFrom(
        this.cartService.updateTransaction(transactionId, reqUpdateTrans)
      );
      if (responseSharedTran) {
        this.isLoading = false;
        this.router.navigate([PathConstant.SUCCESS_QUEUE_PAGE]);
      } else {
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
      this.alert.swalStandardError(
        response.resultDescription,
        response.developerMessage
      );
    }
  }
}
