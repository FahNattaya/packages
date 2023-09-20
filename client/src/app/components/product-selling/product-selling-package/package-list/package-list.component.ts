import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IContractFirstPack,
  IDataPackage,
  IDataPackageSelected,
  IPackageRequest,
  IPromotionShelvesReq,
} from 'src/app/shared/model/product-package.model';
import {
  getLoading,
  getUserData,
} from 'src/app/store-ngrx/selectors/seller.selectors';
import { ISeller } from 'src/app/shared/model/seller.model';
import { ICustomerData } from '../../../../shared/model/customer.model';
import {
  loadMinimumPackages,
  loadPromotionShelves,
  selectedPackage,
} from 'src/app/store-ngrx/actions/product-package.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getCustomerData } from 'src/app/store-ngrx/selectors/customer.selectors';
import {
  getPromotionShelves,
  getMinimumPackage,
  getContractFirstPackData,
} from 'src/app/store-ngrx/selectors/product-package.selectors';
import { getTradeInfo } from 'src/app/store-ngrx/selectors/promotion.selectors';
import { ITrades } from 'src/app/shared/model/promotion.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  @Input() isRequireChangePack: boolean = false;
  @Input() tradeData?: ITrades;
  @Input() selectedPackage?: any;

  indexShowPackage = -1;
  indexShowSelectedPromotionShelves = -1;
  indexShowDataSubShelves = -1;
  indexShowIconPromotionShelve = 0;
  selectPackage = new FormControl('');

  currentPromotionShelvesIndex: number = 0;
  selectedPromotionShelvesData: any;
  allPromotionShelvesData: any;
  customerData!: ICustomerData;
  dataPackageRequest!: IPackageRequest;
  contractFirstPackData!: IContractFirstPack;
  dataPromotionShelvesReq!: IPromotionShelvesReq;
  userData!: ISeller;
  dataPackageSelected!: IDataPackageSelected;

  promotionShelvesData$ = this.store.select(getPromotionShelves);
  customerData$ = this.store.select(getCustomerData);
  tradeData$ = this.store.select(getTradeInfo);
  packageData$ = this.store.select(getMinimumPackage);
  isLoading$ = this.store.select(getLoading);
  contractFirstPackData$ = this.store.select(getContractFirstPackData);

  constructor(private store: Store<AppState>) {}

  async ngOnChanges() {
    if (this.tradeData?.packageKeyRef) {
      this.savePromotionShelvesToStore();
      this.getAllPromotionShelves();
    }
    this.selectPackage.patchValue(this.selectedPackage);
  }

  async ngOnInit(): Promise<void> {
    this.getAllPromotionShelves();
    this.getCustomerData();
    this.getTradeInfo();
    this.getContractFirstPack();
    this.getUserData();
  }

  toggleCollapse(index: number, dataSelectedPromotionShelves: any): void {
    this.indexShowDataSubShelves = index;
    this.indexShowPackage = -1;
    this.saveMinimumPackageToStore(dataSelectedPromotionShelves.sanitizedName);
    // this.clearDataPackageSelected();
  }

  async saveMinimumPackageToStore(sanitizedName: string) {
    this.dataPackageRequest = {
      sanitizedName: sanitizedName,
      minimumPackagePrice: this.tradeData?.minnimumPackagePrice || 0,
      billingSystem: this.customerData.billingSystem,
      location: this.userData.locationCode,
      orderType: this.tradeData?.orderType || '',
      productClass: 'Main',
      province: '',
      disctrict: '',
      subDistrict: '',
      contractPack: this.contractFirstPackData,
    };
    this.store.dispatch(
      loadMinimumPackages({ packageReq: this.dataPackageRequest })
    );
  }

  onSelectPromotionShelves(promotionShelvesIndex: number) {
    this.currentPromotionShelvesIndex = promotionShelvesIndex;
    this.getSelectPromotionShelves(promotionShelvesIndex);
    this.indexShowDataSubShelves = -1;
    this.indexShowPackage = -1;
    this.indexShowIconPromotionShelve = promotionShelvesIndex;
    // this.clearDataPackageSelected();
  }

  getSelectPromotionShelves(index: number) {
    this.promotionShelvesData$.subscribe((data) => {
      this.selectedPromotionShelvesData = data[index];
    });
  }

  getUserData() {
    this.store.select(getUserData).subscribe((data) => {
      if (data) {
        this.userData = data;
      }
    });
  }

  getAllPromotionShelves() {
    this.promotionShelvesData$.subscribe((data) => {
      if (data) {
        this.allPromotionShelvesData = data;
        this.selectedPromotionShelvesData = data[0];
      }
    });
  }

  getCustomerData() {
    this.customerData$.subscribe((data) => {
      if (data) {
        this.customerData = data;
      }
    });
  }

  getTradeInfo() {
    if (!this.tradeData) {
      this.tradeData$.subscribe((data) => {
        if (data) {
          this.tradeData = data;
          this.savePromotionShelvesToStore();
        }
      });
    }
  }

  getContractFirstPack() {
    this.contractFirstPackData$.subscribe((data) => {
      if (data) {
        this.contractFirstPackData = data;
      }
    });
  }

  savePromotionShelvesToStore() {
    this.dataPromotionShelvesReq = {
      userId: this.tradeData?.packageKeyRef || '',
      language: 'TH',
    };
    this.store.dispatch(
      loadPromotionShelves({
        promotionShelvesReq: this.dataPromotionShelvesReq,
      })
    );
  }

  checkShowDetailPackage(
    indexShowPackage: number,
    indexShowSelectedPromotionShelves: number,
    dataPackage: IDataPackage
  ) {
    this.indexShowPackage = indexShowPackage;
    this.indexShowSelectedPromotionShelves = indexShowSelectedPromotionShelves;
    this.setDataPackageSelected(dataPackage);
  }

  setDataPackageSelected(dataPackage: IDataPackage) {
    this.dataPackageSelected = {
      title: dataPackage.title,
      detailTH: dataPackage.detailTH,
      promotionCode: dataPackage.promotionCode,
      currentPackage: false,
      isDisable: false,
      offeringCode: dataPackage.offeringCode
    };

    this.store.dispatch(
      selectedPackage({ dataSelectPackage: this.dataPackageSelected })
    );
  }

  clearDataPackageSelected() {
    this.dataPackageSelected = {
      title: '',
      detailTH: '',
      promotionCode: '',
      currentPackage: false,
      isDisable: true,
    };

    this.store.dispatch(
      selectedPackage({ dataSelectPackage: this.dataPackageSelected })
    );
  }

  getNameIcon(icon: string, isActive: boolean): string {
    const rawIconName = icon.split('.')[0];
    const isNotFound = rawIconName === 'student';

    let imageUrl = '';
    if (isActive) {
      imageUrl = isNotFound
        ? 'assets/package/icon-iswop-active.png'
        : `assets/package/icon-${rawIconName}-active.png`;
    } else {
      imageUrl = isNotFound
        ? 'assets/package/icon-iswop.png'
        : `assets/package/icon-${rawIconName}.png`;
    }
    return imageUrl;
  }
}
