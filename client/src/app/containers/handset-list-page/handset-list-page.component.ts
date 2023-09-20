import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IProductDetailRequest } from 'src/app/shared/model/product.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { IDataSubProduct } from 'src/app/shared/model/product.model';
import { loadProductDetail } from 'src/app/store-ngrx/actions/product.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getproductState } from 'src/app/store-ngrx/selectors/product.selectors';
import { IProductState } from 'src/app/store-ngrx/reducers/product.reducer';
import {
  loadConfigMC,
  loadConfigMcOutCh,
} from 'src/app/store-ngrx/actions/mc-config.action';
import { TokenService } from 'src/app/core/service/token.service';

@Component({
  selector: 'app-handset-list-page',
  templateUrl: './handset-list-page.component.html',
  styleUrls: ['./handset-list-page.component.scss'],
})
export class HandsetListPageComponent implements OnDestroy {
  backPageUrl = PathConstant.SALE_PORTAL_PAGE;
  productState$: Observable<IProductState> = this.store.select(getproductState);
  productSub?: Subscription;
  disabledButtonNext = true;
  selectedModelData!: IProductDetailRequest;
  searchValue: string = '';
  dataSelectedModel = {};
  @ViewChild('imeiModal') imeiModal?: ElementRef;
  resetImeiForm = false;
  imeiSubscription!: Subscription;
  isReComponent: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.store.dispatch(loadConfigMC({ nameConfig: 'customer_criteria' }));
    this.store.dispatch(
      loadConfigMcOutCh({ nameConfig: 'outChannelSales_criteria' })
    );
  }

  onSearch(value: string) {
    if (typeof value === 'object') {
      return;
    }
    if (value === '') {
      this.isReComponent = true;
      return;
    }
    this.searchValue = value;
  }

  onScanImei(isOpenScanImei: boolean) {
    const modalElement = this.imeiModal?.nativeElement;
    if (isOpenScanImei) {
      if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
      }
    }
  }

  onSetImeiSubscription(imeiSubscription: Subscription) {
    this.imeiSubscription = imeiSubscription;
  }

  closeImeiModal() {
    const modalElement = this.imeiModal?.nativeElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
    this.resetImeiForm = !this.resetImeiForm;
    this.imeiSubscription.unsubscribe();
  }

  onSelectProduct(data: IDataSubProduct) {
    this.setDataProduct(data);
  }

  onDisabledButtonNext(disabled: boolean) {
    this.disabledButtonNext = disabled;
  }

  setDataProduct(data: IDataSubProduct) {
    this.selectedModelData = {
      productType: data.productType,
      productSubtype: data.productSubtype,
      brand: data.brand,
      model: data.model,
      location: this.tokenService?.getDataToken()?.locationCode || '',
    };
    this.dataSelectedModel = {
      normalPrice: data.normalPrice,
      productName: data.name,
    };
  }

  onNext() {
    this.store.dispatch(
      loadProductDetail({
        model: this.selectedModelData,
        data: this.dataSelectedModel,
      })
    );
    this.productSub = this.productState$.subscribe((state) => {
      if (state.isLoaded) {
        this.router.navigate([PathConstant.PRODUCT_SELLING_PAGE]);
      }
    });
  }

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }
}
