import { Store } from '@ngrx/store';
import { AppState } from '../../store-ngrx/app.state';
import { BrandsProductComponent } from './brands-product.component';
import { of } from 'rxjs';

let component: BrandsProductComponent;
let store: Store<AppState> = {
  select: jest.fn().mockReturnValue(of([])),
  dispatch: jest.fn(),
} as any;
let productService = {
  getBrandsOfProduct: jest.fn(),
  getModelProduct: jest.fn(),
  getGroupModel: jest.fn(),
};
let tokenService = {
  getDataToken: jest.fn(),
};

describe('BrandsProductComponent', () => {
  beforeEach(async () => {
    component = new BrandsProductComponent(
      store as any,
      productService as any,
      tokenService as any
    );
  });

  it('should create brand list', () => {
    tokenService.getDataToken = jest
      .fn()
      .mockReturnValueOnce({ locationCode: '' });
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should select brand', () => {
    component.onSelectBrand('test');
    expect(component.selectedBrandNames).toEqual(['test']);
  });

  it('can select multiple brand', () => {
    component.onSelectBrands('test');
    expect(component.selectedBrandNames).toEqual(['test']);
    component.onSelectBrands('test 2');
    expect(component.selectedBrandNames).toEqual(['test', 'test 2']);
    component.onSelectBrands('test 3');
    expect(component.selectedBrandNames).toEqual(['test', 'test 2', 'test 3']);
    component.onSelectBrands('test 4');
    expect(component.selectedBrandNames).toEqual(['test', 'test 2', 'test 3']);
    component.onSelectBrands('test 2');
    expect(component.selectedBrandNames).toEqual(['test', 'test 3']);
  });

  it('can check if the brand has been selected', ()=>{
    component.onSelectBrand('test');
    expect(component.checkBrandIsSelected('test')).toBeTruthy();
    expect(component.checkBrandIsSelected('test 2')).toBeFalsy();
  });
});