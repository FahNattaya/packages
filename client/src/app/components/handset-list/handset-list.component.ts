import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import jwt_decode from 'jwt-decode';
import { take } from 'rxjs';
import { TokenService } from 'src/app/core/service/token.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { AppState } from 'src/app/store-ngrx/app.state';
import {
  getSearchWord,
  getSelectedGroupBrands,
  getSelectedSubProduct,
} from 'src/app/store-ngrx/selectors/product.selectors';
import { PathConstant } from '../../shared/constant/path.constant';
import {
  IDataSubProduct,
  IHandset,
  IHandsetResponse,
  ISubProduct,
} from '../../shared/model/product.model';
import {
  saveSelectedGroupBrands,
  saveSelectedSubProduct,
} from 'src/app/store-ngrx/actions/product.action';

const defaultDataSubProduct = {
  productType: '',
  productSubtype: '',
  brand: '',
  name: '',
  model: '',
  imageUrl: '',
  normalPrice: '',
  promotionPrice: {
    min: '',
    max: '',
  },
};
@Component({
  selector: 'app-handset-list',
  templateUrl: './handset-list.component.html',
  styleUrls: ['./handset-list.component.scss'],
})
export class HandsetListComponent implements OnInit {
  @Output() onSelectedSubProduct: EventEmitter<IDataSubProduct> =
    new EventEmitter<IDataSubProduct>();
  @Output() onDisableButtonNext: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() searchValue: string = '';
  accessToken: string = '';
  jwtDecodeValue: string | null = '';
  backPageUrl = PathConstant.VALIDATE_CUSTOMER_PAGE;

  handsetListData: IHandsetResponse[] = [];
  handsetListDisplay: IHandsetResponse[] = [];
  selectedModels: IHandset[] = [];
  dataSubProduct: IDataSubProduct = {
    productType: '',
    productSubtype: '',
    brand: '',
    name: '',
    model: '',
    imageUrl: '',
    normalPrice: '',
    promotionPrice: {
      min: '',
      max: '',
    },
  };
  isSearching: boolean = false;
  isLoading: boolean = true;
  disabledButtonNext: boolean = true;
  searchWord: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private tokenService: TokenService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') || '';
    if (this.accessToken !== '') {
      this.jwtDecodeValue = jwt_decode(this.accessToken);
    }
    this.initHandsetData();
    this.onSearchHandset();
    this.store.select(getSelectedGroupBrands).pipe(take(1)).subscribe(groupBrand => {
      groupBrand.forEach(async groupBrand=>{
        await this.checkModelIsSelected(groupBrand.name);
        this.onSelectGroupModel(groupBrand, true);
      })
    });
    this.store.select(getSelectedSubProduct).pipe(take(1)).subscribe(subProduct => {
      if (subProduct) {
        this.dataSubProduct = subProduct
        this.onSetDataSubProduct(subProduct, false);
      }
    })
  }

  initHandsetData() {
    this.productService.getDataGroupModel().subscribe((groupModel) => {
      this.onUncheckBrand(groupModel);
      this.handsetListData = groupModel;
      this.handsetListDisplay = groupModel;
    });
  }

  onSearchHandset() {
    this.store.select(getSearchWord).subscribe((word) => {
      if (word) {
        this.searchWord = word;
        this.isSearching = true;
        this.isLoading = false;
        this.productService.searchProduct(word).subscribe({
          next: (res) => {
            this.selectedModels = res.data
              .map((result: IHandsetResponse) => result.products)
              .flat();
            this.isLoading = true;
          },
          error: (_) => {
            this.isLoading = false;
          },
        });
      } else {
        this.isSearching = false;
        this.selectedModels.length = 0;
        this.handsetListDisplay = [...this.handsetListData];
      }
    });
  }

  onUncheckBrand(groupModel: IHandsetResponse[]) {
    if (groupModel.length === 0) {
      this.onSetDataSubProduct({ ...defaultDataSubProduct }, true);
      this.selectedModels = [];
    } else if (this.selectedModels.length !== 0) {
      this.selectedModels = [...this.selectedModels].filter(
        (selectedModel) =>
          !!groupModel.find((model) => model.brand === selectedModel.brand)
      );
    }
  }

  onSearch(search: string) {
    this.handsetListDisplay = [...this.handsetListData].map((model) => ({
      ...model,
      products: model.products.filter((product: IHandset) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue'].currentValue) {
      const search = changes['searchValue'].currentValue;
      if (typeof search !== 'object') {
        this.onSearch(search);
      } else {
        this.handsetListDisplay = [...this.handsetListData];
      }
    }
  }

  onSetDataSubProduct(
    dataSubProduct: IDataSubProduct,
    disabledButtonNext: boolean
  ) {
    this.dataSubProduct = dataSubProduct;
    this.disabledButtonNext = disabledButtonNext;
    this.onSelectedSubProduct.emit(this.dataSubProduct);
    this.onDisableButtonNext.emit(this.disabledButtonNext);
  }

  async onSelectGroupModel(groupModel: IHandset, isDataFromStore: boolean) {
    const modelIsSelected = this.selectedModels.some(
      (model) => model.name === groupModel.name
    );
    if (modelIsSelected) {
      this.selectedModels = this.selectedModels.filter(
        (model) => model.name !== groupModel.name
      );
      const isProductSelected = groupModel.subProducts.some(
        (subProduct) => subProduct.model === this.dataSubProduct.model
      );
      if (isProductSelected) {
        this.onSetDataSubProduct({ ...defaultDataSubProduct }, true);
      }
    } else {
      const isMaximumSelected = this.selectedModels.length === 3;
      if (isMaximumSelected) return;
      this.selectedModels.push(groupModel);
    }
    this.selectedModels = await this.onCallProductDetail(this.selectedModels);
     if (!isDataFromStore) {
      this.store.dispatch(saveSelectedGroupBrands({selectedGroupBrand: groupModel}))
     }
    
  }

  async onCallProductDetail(product: IHandset[]): Promise<IHandset[]> {
    const updatedProducts: IHandset[] = await Promise.all(
      product.map(async (data) => {
        let reqProduct = {
          productType: data.productType,
          productSubtype: data.productSubtype,
          location: this.tokenService.getDataToken().locationCode,
          brand: data.brand,
        };
        const updatedData = { ...data };
        updatedData.subProducts = await Promise.all(
          updatedData.subProducts.map(async (subProduct) => {
            return this.updateSubProductData(subProduct, reqProduct);
          })
        );
        return updatedData;
      })
    );
    return updatedProducts;
  }

  async updateSubProductData(
    subProductData: any,
    reqProduct: any
  ): Promise<ISubProduct> {
    return new Promise<ISubProduct>((resolve) => {
      const subscription = this.productService
        .getProductDetail({
          ...reqProduct,
          model: subProductData.model,
        })
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            const updatedSubProductData = {
              ...subProductData,
              colors: response.products,
              image: response.products.find(
                (product) => product.images.thumbnail
              )?.images?.thumbnail,
            };
            resolve(updatedSubProductData);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            subscription.unsubscribe();
          },
        });
    });
  }

  onSelectProduct(modelSelected: IHandset, product: ISubProduct) {
    const dataSubProduct = {
      productType: modelSelected.productType,
      productSubtype: modelSelected.productSubtype,
      brand: modelSelected.brand,
      name: product.name,
      model: product.model,
      imageUrl: product.imageUrl,
      normalPrice: product.normalPrice.max,
      promotionPrice: product.promotionPrice,
    };
    this.store.dispatch(saveSelectedSubProduct({selectedSubProduct: dataSubProduct}));
    this.onSetDataSubProduct(dataSubProduct, false);
  }

  checkModelIsSelected(modelName: string): boolean {
    return this.selectedModels.some(
      (selectedModel) => selectedModel.name === modelName
    );
  }

  onNext() {
    this.router.navigate([PathConstant.PRODUCT_SELLING_PAGE]);
  }
}
