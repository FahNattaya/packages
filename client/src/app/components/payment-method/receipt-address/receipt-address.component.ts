import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { ErrorService } from 'src/app/core/service/error.service';
import { messageConstant } from 'src/app/shared/constant/message.constant';
import { IIdCardAddress } from 'src/app/shared/model/customer.model';
import {
  loadCustomerDataByPhone,
  saveOtherAddress,
  saveSelectedAddress,
} from 'src/app/store-ngrx/actions/customer.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import {
  getCustomerData,
  getState,
} from 'src/app/store-ngrx/selectors/customer.selectors';
import { getIsSelectedLoan, getLoanAddress } from 'src/app/store-ngrx/selectors/payments.selectors';

interface IBillingDisplay {
  key: string;
  name: string;
  address: IIdCardAddress | undefined;
}

@Component({
  selector: 'app-receipt-address',
  templateUrl: './receipt-address.component.html',
  styleUrls: ['./receipt-address.component.scss'],
})
export class ReceiptAddressComponent implements OnInit {
  isReceiptAddressOpen: boolean = false;
  mobileNumber = new FormControl('');
  selectedAddress = new FormControl();
  customerAddress: IBillingDisplay[] = [];
  destroyed$: Subject<void> = new Subject();
  newAddress: IBillingDisplay[] = [];
  isLoanSelected?: boolean = false;
  @Input() receiptAddressState!: boolean;
  @Output() isReceiptAddressSelected = new EventEmitter<boolean>();

  constructor(
    private store: Store<AppState>,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.selectedAddress.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((v) => {
        this.isReceiptAddressSelected.emit(!v);
      });
    this.store
      .select(getCustomerData)
      .pipe(take(1))
      .subscribe((customerData) => {
        if (customerData?.mobileNo) {
          this.mobileNumber.patchValue(customerData?.mobileNo);
          this.store.dispatch(
            loadCustomerDataByPhone({ mobileNo: customerData?.mobileNo })
          );
        }
      });

    this.loadCustomerAddress();

    this.store.select(getIsSelectedLoan).subscribe(isSelected => {
      this.isLoanSelected = isSelected
      if (isSelected) {
        this.store.select(getLoanAddress).subscribe(load => {
          this.customerAddress = [{
            key: 'loan address',
            name: 'ที่อยู่บริษัทสินเชื่อ',
            address: load?.address
          }]
        });
        this.setDefaultAddress()
      } else {
        this.loadCustomerAddress();
      }
    })

    this.store
      .select(getState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        if (state.isError) {
          this.customerAddress = [];
        }
        if (state.otherAddress) {
          if (this.customerAddress.length == 0) {
            this.selectedAddress.patchValue('New');
          }
          this.newAddress = [
            {
              key: 'New',
              name: 'ที่อยู่ใหม่',
              address: state.otherAddress,
            },
          ];
        }
      });
    if (this.customerAddress.length === 0) {
      this.receiptAddressState = true;
      return;
    }
    this.receiptAddressState = false;
  }

  loadCustomerAddress() {
    this.store
      .select(getCustomerData)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((customer) => {
        if (customer) {
          this.customerAddress = [
            {
              key: 'customer',
              name: 'ที่อยู่ตามบัตรประชาชน',
              address: customer?.customerAddress,
            },
            {
              key: 'billing',
              name: 'ที่อยู่ตามใบแจ้งค่าใช้บริการ',
              address: customer?.receiptAddress!,
            },
          ];
          this.setDefaultAddress();
        }
      });
  }

  mapAddress(customerAddress: any): string {
    const addressParts = [
      customerAddress?.homeNo,
      `${customerAddress?.room ? `ห้อง ${customerAddress?.room}` : ''}`,
      `${customerAddress?.floor ? `ชั้น ${customerAddress?.floor}` : ''}`,
      `${customerAddress?.buildingName ? customerAddress?.buildingName : ''}`,
      customerAddress?.mooban,
      `${customerAddress?.moo ? `หมู่ที่ ${customerAddress?.moo}` : ''}`,
      `${customerAddress?.soi ? `ซอย ${customerAddress?.soi}` : ''}`,
      customerAddress?.street,
      customerAddress?.tumbol,
      customerAddress?.zipCode?.ZIPCODE || customerAddress?.zipCode,
      customerAddress?.amphur,
      customerAddress?.province,
      customerAddress['name'],
      customerAddress['email'],
      customerAddress['mobileNo'],
    ];
    const formattedAddress = addressParts.filter((part) => part).join(' ');
    return formattedAddress;
  }

  getAddress() {
    if (this.mobileNumber.value?.length === 10) {
      this.store.dispatch(
        loadCustomerDataByPhone({ mobileNo: this.mobileNumber.value })
      );
      this.store.dispatch(saveOtherAddress({ otherAddress: '' }));
      this.selectedAddress.patchValue('');
      this.newAddress = [];
      return;
    }
    this.errorService.handleError({
      customMessage: messageConstant.ERROR_PHONE_NUMBER_LENGTH,
    });
  }

  setDefaultAddress() {
    if (this.isLoanSelected) {
      this.selectedAddress.patchValue('loan address');
    } else {
      this.selectedAddress.patchValue('customer');
    }
    this.onSelectAddress(this.customerAddress[0]);
  }

  onSelectAddress(address: IBillingDisplay) {
    this.selectedAddress.patchValue(address.key);
    this.store.dispatch(
      saveSelectedAddress({ selectedAddress: address.address! })
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
