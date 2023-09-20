import { OnInit, Component, Input } from '@angular/core';
import { AppState } from 'src/app/store-ngrx/app.state';
import { Store } from '@ngrx/store';
import { ICustomerData } from '../../model/customer.model';
import {
  getContractData,
  getblackListLimitData,
} from 'src/app/store-ngrx/selectors/customer.selectors';
import { SharedService } from '../../service/shared.service';

interface Icon {
  [key: string]: string;
}
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  @Input() customer!: ICustomerData;
  expended: boolean = false;
  blackListLimitDataStore$ = this.store.select(getblackListLimitData);
  dataContractMobileStore$ = this.store.select(getContractData);
  blackListMessage?: string;
  serviceYearMessage?: string;
  customerName?: string;
  mobileNo?: string;
  contactUsedMsg?: string;
  contactUsableMsg?: string;
  dataTestIdContact?: string;
  chargeTypeIcons: Icon = {
    'Post-paid': 'assets/ais-icon-2.png',
    'Pre-paid': 'assets/AIS 1 2 Call.png',
    Fibre: 'assets/AIS Fibre.png',
  };
  enable: {
    customerName: boolean;
    mobileNo: boolean;
  } = { customerName: false, mobileNo: false };

  constructor(
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.customer) {
      const { serviceYear, customerName, mobileNo } = this.customer;
      this.serviceYearMessage = `${serviceYear.year || 0} ปี ${
        serviceYear.month || 0
      } เดือน ${serviceYear.day || 0} วัน`;
      this.customerName = this.sharedService.maskingData(
        customerName,
        customerName.indexOf(' ') + 1
      );
      this.mobileNo = this.sharedService.maskingData(mobileNo, 3, 6);
    }
    this.onUpdateBlackList();
    this.onUpdateContractMobile();
  }

  onExpend(expended: boolean) {
    this.expended = !expended;
  }

  onUpdateContractMobile(): void {
    this.dataContractMobileStore$.subscribe((data) => {
      if (data && data != undefined) {
        const dataContract =
          data.profileTypeList?.[0]?.contractList?.[0]?.contractDetailList;
        const countContract = dataContract?.filter(
          (contract: any) => contract?.status === 'Active'
        )?.length;
        this.contactUsedMsg = `คุณมีสัญญาอยู่ ${countContract} สัญญา`;
        this.dataTestIdContact = 'oneIdTwoContactMessage';
      }
    });
  }

  onUpdateBlackList(): void {
    this.blackListLimitDataStore$.subscribe((data) => {
      if (data && data != undefined) {
        this.blackListMessage = data?.message;
      }
    });
  }

  onEnableEye(field: 'customerName' | 'mobileNo') {
    this.enable[field] = !this.enable[field];
    const isCustomer = field === 'customerName';

    if (this.enable[field]) {
      this[field] = isCustomer
        ? this.customer.customerName
        : this.customer.mobileNo;
    } else {
      this[field] = isCustomer
        ? this.sharedService.maskingData(
            this.customer.customerName,
            this.customer.customerName.indexOf(' ') + 1
          )
        : this.sharedService.maskingData(this.customer.mobileNo, 3, 6);
    }
  }
}
