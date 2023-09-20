import { Action, createReducer, on } from '@ngrx/store';

import {
  IDataSubProduct,
  IHandset,
  IListData,
  IProductDetail,
} from 'src/app/shared/model/product.model';
import * as productAction from '../actions/product.action';

export interface IProductState {
  selectedBrand?: IHandset[];
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;
  selectedProduct?: IProductDetail;
  selectedAllModel?: IHandset;
  stockData?: IListData[];
  stockMyshop?: any;
  isLoadingMyShop: boolean;
  isLoadedMyShop: boolean;
  isLoadedOther: boolean;
  isLoadingOther: boolean;
  searchWord?: string;
  selectedBrandNames: string[];
  selectedGroupBrands: IHandset[];
  selectedSubProduct?: IDataSubProduct;
  selectedHandset?: ISelectedHandset;
}
export interface ISelectedHandset {
  selectedBrands: string[];
  selectedModels: string[];
  selectedProduct: string;
}
let location: Array<string> = [];
let dataFinal: any[] = [];

export const initialState: IProductState = {
  isLoaded: false,
  isLoading: false,
  isError: false,
  isLoadingMyShop: false,
  isLoadedMyShop: false,
  isLoadedOther: false,
  isLoadingOther: false,
  selectedBrandNames: [],
  selectedGroupBrands: []
};

export const productReducer = createReducer(
  initialState,
  on(productAction.saveSelectBrandModel, (state, { selectedProduct }) => ({
    ...state,
    isLoaded: true,
    isLoading: false,
    selectedProduct: selectedProduct,
  })),
  on(productAction.saveSelectModelProduct, (state, { selectedAllModel }) => ({
    ...state,
    selectedAllModel: selectedAllModel,
    isLoaded: true,
    isLoading: false,
  })),
  on(productAction.loadStockDataMyShopSuccess, (state, { dataStock }) => {
    return {
      ...state,
      stockMyshop: [...state.stockMyshop, dataStock],
      isLoadedMyShop: true,
      isLoadingMyShop: false,
    };
  }),
  on(productAction.loadStockDataMyShop, (state) => ({
    ...state,
    isLoadedMyShop: false,
    isLoadingMyShop: true,
  })),
  on(productAction.loadStockDataMyShopFailure, (state, { error }) => ({
    ...state,
    isLoadedMyShop: true,
    isLoadingMyShop: false,
    isError: error,
  })),
  on(productAction.loadStockDataOther, (state) => ({
    ...state,
    isLoadedOther: false,
    isLoadingOther: true,
  })),
  on(productAction.loadStockDataOtherFailure, (state, { error }) => ({
    ...state,
    isLoadedOther: true,
    isLoadingOther: false,
    isError: error,
  })),
  on(productAction.loadStockDataOtherSuccess, (state, { dataStock }) => {
    const dataMod = mapDataFunction(dataStock, dataFinal);
    dataFinal = dataMod;
    return {
      ...state,
      stockData: dataMod,
      isLoadedOther: true,
      isLoadingOther: false,
    };
  }),
  on(productAction.clearStockData, (state) => {
    dataFinal = [];
    location = [];
    return {
      ...state,
      stockData: [],
      stockMyshop: [],
      isLoadedMyShop: false,
      isLoadingMyShop: false,
      isLoadedOther: false,
      isLoadingOther: false,
    };
  }),
  on(productAction.loadProductDetail, (state) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  // hanndle search
  on(productAction.saveSearchWord, (state, { searchWord }) => ({
    ...state,
    searchWord: searchWord,
  })),
  on(productAction.saveSelectedBrands, (state, { selectedBrandNames }) => (
    {
    ...state,
    selectedBrandNames: [
      ...state.selectedBrandNames.filter(name => !selectedBrandNames.includes(name)),
      [selectedBrandNames].filter(name => !state.selectedBrandNames.includes(name)).join(),
    ],
  })),
  on(productAction.saveSelectedGroupBrands, (state, { selectedGroupBrand }) => {
    const isAlreadySelected = state.selectedGroupBrands.some(brand => {
      return brand.brand === selectedGroupBrand.brand && brand.name === selectedGroupBrand.name;
    });

    if (isAlreadySelected) {
      return {
        ...state,
        selectedGroupBrands: state.selectedGroupBrands.filter(brand => {
          return !(brand.brand === selectedGroupBrand.brand && brand.name === selectedGroupBrand.name);
        })
      };
    } else {
      return {
        ...state,
        selectedGroupBrands: [...state.selectedGroupBrands, selectedGroupBrand]
      };
    }
  }),
  on(productAction.saveSelectedSubProduct, (state, { selectedSubProduct}) => ({
    ...state,
    selectedSubProduct: selectedSubProduct
  })),
  // on(productAction.saveSelectedSubProduct, (state, { selectedSubProduct}) => {
  //   const isSubProductAlreadySelected = state.selectedSubProduct.some(subProduct => {
  //     return subProduct.name == selectedSubProduct.name && subProduct.model == selectedSubProduct.model;
  //   });
  //   if (isSubProductAlreadySelected) {
  //     return {
  //       ...state,
  //       selectedSubProduct: state.selectedSubProduct.filter(subProduct => {
  //         return !(subProduct.name == selectedSubProduct.name && subProduct.model == selectedSubProduct.model);
  //       })
  //     };
  //   } else {
  //     return {
  //       ...state,
  //       selectedSubProduct: [...state.selectedSubProduct, selectedSubProduct]
  //     }
  //   }
  // }),

  on(
    productAction.saveSelectedHandset,
    (state, { selectedBrands, selectedModels, selectedProduct }) => ({
      ...state,
      saveSelectedHandset: { selectedBrands, selectedModels, selectedProduct },
    })
  )
);

export function Reducer(state: IProductState, action: Action) {
  return productReducer(state, action);
}

function mapDataFunction(data: IListData[], dataFinals: any) {
  let updatedDataFinal: any = [];
  const dataResponse = [...dataFinals];
  if (dataFinal.length != 0) {
    data.map((datas: IListData) => {
      let index = location.indexOf(datas.locationCode);
      if (index == -1) {
        location.push(datas.locationCode);
        const updatedElement = datas;
        dataResponse[location.indexOf(datas.locationCode)] = updatedElement;
        updatedDataFinal = dataResponse;
      } else {
        const updatedElement = {
          ...dataFinal[index],
          productStock: dataFinal[index].productStock.concat(
            datas.productStock
          ),
        };
        dataResponse[index] = updatedElement;
        updatedDataFinal = dataResponse;
      }
    });
    return updatedDataFinal;
  } else {
    data.map((datas: IListData) => {
      location.push(datas.locationCode);
      updatedDataFinal.push(datas);
    });
    return updatedDataFinal;
  }
}
