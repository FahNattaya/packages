import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { TokenService } from 'src/app/core/service/token.service';
import { ProductService } from 'src/app/shared/service/product.service';
import {
  getSearchWord, getselectedBrandNames
} from 'src/app/store-ngrx/selectors/product.selectors';
import { saveSelectedBrands } from '../../store-ngrx/actions/product.action';
import { AppState } from '../../store-ngrx/app.state';
import { getCustomerData } from '../../store-ngrx/selectors/customer.selectors';

@Component({
  selector: 'app-brands-product',
  templateUrl: './brands-product.component.html',
  styleUrls: ['./brands-product.component.scss'],
})
export class BrandsProductComponent implements OnInit {
  @Input() isStock?: boolean;
  @Input() isReComponent?: boolean;
  selectedBrandNames: string[] = [];
  brands$: Observable<any> | undefined;
  accountData$ = this.store.select(getCustomerData);
  isSearch: boolean = false;

  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private tokenService: TokenService
  ) {}

  async ngOnInit() {
    this.getAllBrand();
    this.isSearchWord();
    this.loadSelectedBrandName();

    if (this.isReComponent) {
      this.getAllBrand();
    }
  }

  loadSelectedBrandName() {
    this.store
      .select(getselectedBrandNames)
      .pipe(take(1))
      .subscribe((brandNames) => {
        this.callModelOfBrands(brandNames);
        brandNames.forEach((brandName) => {
          if (brandName != '') {
            // this.onSelectBrands(brandName)
            this.selectedBrandNames.push(brandName);
          }
        });
      });
  }

  isSearchWord() {
    this.store.select(getSearchWord).subscribe((isSearch) => {
      isSearch ? (this.isSearch = false) : (this.isSearch = true);
    });
  }

  async getAllBrand() {
    const locationCode = await this.tokenService.getDataToken().locationCode;
    this.productService
      .getBrandsOfProduct(locationCode || '')
    this.brands$ = this.productService.getBrandsOfProduct(locationCode || '');
  }

  onSelectBrand(brandName: string) {
    this.selectedBrandNames = [brandName];
    this.callModelOfBrand(brandName);
  }

  onSelectBrands(brandName: string) {
    this.store.dispatch(saveSelectedBrands({ selectedBrandNames: brandName }));
    const indexBrandIsSelected = this.selectedBrandNames.some(
      (brand) => brand === brandName
    );
    if (indexBrandIsSelected) {
      this.selectedBrandNames = this.selectedBrandNames.filter(
        (brand) => brand !== brandName
      );
    } else {
      const isMaximumSelected = this.selectedBrandNames.length === 3;
      if (isMaximumSelected) return;
      this.selectedBrandNames.push(brandName);
    }
    this.callModelOfBrands(this.selectedBrandNames);
  }

  callModelOfBrands(brandName: string[]) {
    this.productService.getGroupModel(brandName);
  }

  callModelOfBrand(brandName: string) {
    this.productService.getModelProduct(brandName);
  }

  checkBrandIsSelected(brandName: string): boolean {
    return this.selectedBrandNames.some((brand) => brand === brandName);
  }
}
