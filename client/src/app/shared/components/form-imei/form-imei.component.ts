import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { TokenService } from 'src/app/core/service/token.service';
import { Subscription, firstValueFrom, take } from 'rxjs';
import { ICheckImeiData, IProductDetail } from '../../model/product.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { saveSelectBrandModel } from 'src/app/store-ngrx/actions/product.action';
import { Router } from '@angular/router';
import { PathConstant } from '../../constant/path.constant';
import { getProductInCart } from 'src/app/store-ngrx/selectors/cart.selectors';

@Component({
  selector: 'app-form-imei',
  templateUrl: './form-imei.component.html',
  styleUrls: ['./form-imei.component.scss'],
})
export class FormImeiComponent implements OnInit, OnChanges {
  @Input() isCartPage: boolean = false;
  @Input() isSuccess: boolean = false;
  @Input() resetForm: boolean = false;
  @Output() onConfirmImei: EventEmitter<any> = new EventEmitter<any>();
  @Output() goNextPage: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() imeiSubscription: EventEmitter<Subscription> =
    new EventEmitter<Subscription>();

  isScanImei: boolean = false;
  imeiCode: string = '';
  imeiForm: FormGroup;
  dataForm!: ICheckImeiData;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private tokenService: TokenService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.imeiForm = this.formBuilder.group({
      imeiNo: ['', [Validators.required]],
      modelName: ['', [Validators.required]],
      price: [0],
    });
  }
  async ngOnInit(): Promise<void> {
    if (this.isCartPage) {
      const productDetail = await firstValueFrom(
        this.store.select(getProductInCart).pipe(take(1))
      );
      if (productDetail && productDetail?.imei) {
        this.isSuccess = true;
        this.imeiForm.patchValue({
          imeiNo: productDetail?.imei,
          modelName:
            productDetail?.brand +
            productDetail?.model +
            productDetail?.colorName,
        });
      }
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (
      changes['resetForm']?.currentValue != changes['resetForm']?.previousValue
    ) {
      this.isSuccess = false;
      this.imeiForm.reset();
      this.isLoading = false;
    }
  }

  saveForm() {
    this.imeiForm.patchValue({
      price: this.dataForm.price || 0.0,
      modelName:
        this.dataForm.brand +
          ' ' +
          this.dataForm.model +
          ' ' +
          this.dataForm.color || '',
    });
    this.isSuccess = true;
  }

  onChangeImei(imeiNo: HTMLInputElement) {
    const imeiNoIsChanged = imeiNo.value && this.imeiCode && imeiNo.value !== this.imeiCode;
    if (imeiNoIsChanged) {
      this.imeiForm.patchValue({
        imeiNo: imeiNo.value,
        modelName: '',
        price: '',
      });
      this.isSuccess = false;
    }
    if (!imeiNo.value) {
      this.imeiForm.reset();
      this.isSuccess = false;
    }
  }

  checkImei() {
    this.isLoading = true;
    const requestCheckImei = {
      locationCode: this.tokenService.getDataToken().locationCode,
      imei: this.imeiForm.get('imeiNo')?.value,
    };
    const imeiSubscription = this.productService
      .checkImeiDT(requestCheckImei)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.dataForm = response;
          this.isLoading = false;
          this.onConfirmImei.emit({
            ...response,
            imeiNo: this.imeiForm.get('imeiNo')?.value
            // price: response.price || '',
          });
          this.imeiCode = this.imeiForm.get('imeiNo')?.value;
          this.saveForm();
        },
        error: () => {
          this.isLoading = false;
          this.isSuccess = false;
          this.imeiForm.reset({
            imeiNo: '',
            modelName: '',
            price: '',
          });
          this.onConfirmImei.emit({
            imeiNo: ''
          });
        },
      });
    this.imeiSubscription.emit(imeiSubscription);
  }

  onScanImei() {
    this.isScanImei = !this.isScanImei;
  }

  onScanSuccess(imeiCode: string) {
    this.imeiForm.patchValue({
      imeiNo: imeiCode,
      modelName: '',
      price: '',
    });
    this.isSuccess = false;
    this.imeiCode = imeiCode;
    if (imeiCode) {
      this.isScanImei = false;
    }
  }

  onNext() {
    const reqProductDetail = {
      productType: this.dataForm.productType,
      productSubtype: this.dataForm.productSubtype,
      location: this.tokenService.getDataToken().locationCode,
      brand: this.dataForm.brand,
      model: this.dataForm.model,
    };
    this.productService
      .getProductDetail(reqProductDetail)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          let selectedProductDetail: IProductDetail = {
            productType: this.dataForm.productType,
            productSubtype: this.dataForm.productSubtype,
            brand: this.dataForm.brand,
            model: this.dataForm.model,
            matCode: this.dataForm.matcode,
            location: this.tokenService.getDataToken().locationCode,
            normalPrice: this.dataForm.price?.toString()!,
            productName: data.name,
            colors: [],
            imei: {
              code: this.imeiCode || this.imeiForm.get('imeiNo')?.value,
              modelName: this.imeiForm.get('modelName')?.value || '',
              price: this.imeiForm.get('price')?.value || '',
            },
          };
          if (this.dataForm.color && this.dataForm.color != '') {
            const colors = data.products
              .filter((data) => data.colorName === this.dataForm.color)
              .map((product, index) => {
                return {
                  colorId: index,
                  code: `#${product.colorCode}`,
                  name: product.colorName,
                  stock: '0',
                  imageUrl: product.images.baseView.map(
                    (image) => image.imageUrl
                  ),
                };
              });
            selectedProductDetail.colors = colors;
          } else {
            selectedProductDetail.colorDefault = data.products[0].colorName;
            selectedProductDetail.imageDefault = data.products[0].images.baseView[0].imageUrl
          }
          this.store.dispatch(
            saveSelectBrandModel({ selectedProduct: selectedProductDetail })
          );
        },
        complete: () => {
          this.router.navigate([PathConstant.PRODUCT_SELLING_PAGE]);
          this.goNextPage.emit(true);
          this.imeiForm.reset();
        },
      });
  }
}
