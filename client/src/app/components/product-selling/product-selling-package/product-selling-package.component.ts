import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store-ngrx/app.state';
import { getCustomerData } from '../../../store-ngrx/selectors/customer.selectors';
import {
  ICurrentPackage,
  IDataPackageSelected,
} from '../../../shared/model/product-package.model';
import { IProductCart } from 'src/app/shared/model/cart.model';
import { ITrades } from 'src/app/shared/model/promotion.model';
import {
  loadCurrentPackage,
  loadContractFirstPack,
} from 'src/app/store-ngrx/actions/package.action';
import { selectedPackage } from 'src/app/store-ngrx/actions/product-package.action';
import {
  getCurrentPackageData,
  getSelectPackage,
} from 'src/app/store-ngrx/selectors/product-package.selectors';
import { getTradeInfo } from 'src/app/store-ngrx/selectors/promotion.selectors';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-selling-package',
  templateUrl: './product-selling-package.component.html',
  styleUrls: ['./product-selling-package.component.scss'],
})
export class ProductSellingPackageComponent implements OnInit, OnChanges {
  constructor(private store: Store<AppState>) {}
  @Input() isCart: boolean = false;
  @Input() productEditable?: IProductCart;
  @Input() isSelectedTrade?: boolean;
  @Input() selectedTrade?: ITrades | any;

  @Output() selectedChange = new EventEmitter();
  currentPackageData$ = this.store.select(getCurrentPackageData);
  customerData$ = this.store.select(getCustomerData);
  tradeData$ = this.store.select(getTradeInfo);
  packageData$ = this.store.select(getSelectPackage);
  tradeData?: any;

  mobileNumber?: string;
  idCardNumber?: string;
  currentPackage?: ICurrentPackage;
  selectedCurrentPack = new FormControl('');
  requireChangePromotion?: boolean = false;
  isRequireChangePack: boolean = false;
  dataPackageSelected: IDataPackageSelected = {
    title: '',
    detailTH: '',
    promotionCode: '',
    currentPackage: false,
    isDisable: false,
  };
  ngOnInit(): void {
    this.customerData$.subscribe((customer) => {
      this.mobileNumber = customer?.mobileNo;
      this.idCardNumber = customer?.idCardNo;
    });
    this.currentPackageData$.subscribe((current) => {
      this.currentPackage = current;
      this.selectedCurrentPack.patchValue(current?.name!! + current?.price!!);
    });
    if (!this.isCart) {
      this.tradeData$.subscribe((trade) => {
        this.tradeData = trade;
        this.requireChangePromotion = trade?.requireChangePromotion;
      });
    }
    if (this.mobileNumber !== '0968067780') {
      this.loadContractFirstPack();
      this.loadCurrentPackage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isCart && changes['productEditable'].currentValue) {
      const productEditable = changes['productEditable'].currentValue;
      this.tradeData = productEditable.trade;
      this.requireChangePromotion =
        productEditable.trade.requireChangePromotion;
      this.selectedCurrentPack.patchValue(productEditable.package);
    }
    if (this.selectedTrade) {
      this.tradeData = this.selectedTrade;
      this.requireChangePromotion = this.tradeData?.requireChangePromotion;
      this.isRequireChangePack =
        !this.requireChangePromotion &&
        this.convertStringToNumber(this.currentPackage?.price!!) >=
          this.tradeData!!.minnimumPackagePrice;
      this.setCurrentPackageChecked(this.isRequireChangePack);
      this.setIsRequireChangePack(
        !this.requireChangePromotion,
        this.currentPackage?.price!!,
        this.tradeData?.minnimumPackagePrice!!
      );
    }
  }

  loadCurrentPackage() {
    this.store.dispatch(
      loadCurrentPackage({ mobileNumber: this.mobileNumber!!, language: 'TH' })
    );
  }
  loadContractFirstPack() {
    this.store.dispatch(
      loadContractFirstPack({
        mobileNo: this.mobileNumber!!,
        idCardNo: this.idCardNumber!!,
      })
    );
  }

  setIsRequireChangePack(
    isRequire: boolean,
    currentPackagePrice: string,
    minimumPrice: number
  ) {
    this.isRequireChangePack =
      isRequire &&
      this.convertStringToNumber(currentPackagePrice) >= minimumPrice;
    this.setCurrentPackageChecked(this.isRequireChangePack);
  }
  convertStringToNumber(price: string) {
    return parseInt(price);
  }

  checkSelectedRadio() {
    this.dataPackageSelected = {
      title: this.currentPackage?.name!!,
      detailTH: this.currentPackage?.description!!,
      promotionCode: '',
      currentPackage: true,
      isDisable: false,
    };

    this.store.dispatch(
      selectedPackage({ dataSelectPackage: this.dataPackageSelected })
    );
  }

  setCurrentPackageChecked(isRequire: boolean) {
    if (isRequire && this.dataPackageSelected.promotionCode == '') {
      this.dataPackageSelected = {
        title: this.currentPackage?.name!!,
        detailTH: this.currentPackage?.description!!,
        promotionCode: '',
        currentPackage: true,
        isDisable: false,
      };
    } else {
      this.dataPackageSelected = {
        title: '',
        detailTH: '',
        promotionCode: '',
        currentPackage: false,
        isDisable: true,
      };
    }
    this.store.dispatch(
      selectedPackage({ dataSelectPackage: this.dataPackageSelected })
    );
  }
}
