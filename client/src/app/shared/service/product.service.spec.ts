import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import {
  ICheckStockReq,
  ICheckStockRes,
  IHandset,
  IProductList,
  IProductStockRequest,
} from '../model/product.model';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get brand and product', () => {
    // it('should return brands of products', () => {
    //   const mockResponse = responseMockApppleModel;

    //   service.getModelProduct('APPLE');

    //   const req = httpMock.expectOne(
    //     `${environment.API_URL}/v1/product/product-by-brand`
    //   );
    //   expect(req.request.method).toBe('POST');
    //   req.flush(mockResponse);
    //   httpMock.verify();
    // });

    // it('should return all brands', (done) => {
    //   const mockResponse = responseMockBrand;

    //   service.getBrandsOfProduct('1100').subscribe((data: any) => {
    //     expect(data).toEqual(mockResponse);
    //     done();
    //   });

    //   const req = httpMock.expectOne(
    //     `${environment.API_URL}/v1/product/all-brands/1100`
    //   );
    //   expect(req.request.method).toBe('GET');
    //   req.flush(mockResponse);
    //   httpMock.verify();
    // });

    it('should get product detail', (done) => {
      const mockResponse = {
        data: {
          products: [
            { colorName: 'RED', images: {} },
            { colorName: 'GREEN', images: {} },
          ],
        },
      };

      service.getProductDetail({} as any).subscribe((data) => {
        expect(data).toMatchObject(mockResponse);
        done();
      });

      const req = httpMock.expectOne(
        `${environment.API_URL}/v1/product/product-detail`
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
      httpMock.verify();
    });
  });

  it('should retrieve checkStock data from the given url', () => {
    const mockResponse: ICheckStockRes = {
      resultCode: 'resultCode',
      resultDescription: 'desc',
      developerMessage: 'message',
      data: {
        resultCode: 'resultCode',
        resultMessage: 'desc',
        soId: '12345',
      },
    };
    const mockReq: ICheckStockReq = {
      locationSource: 'string',
      locationReceipt: 'string',
      userId: 'string',
      cusNameOrder: 'string',
      subStockDestination: 'string',
      soChannelType: 'string',
      soDocumentType: 'string',
      storeName: 'string',
      preBookingNo: 'string',
      reserveNo: 'string',
      grandTotalAmt: 'string',
      depositAmt: 'string',
      productList: [] as IProductList[],
    };

    service.getCheckStock(mockReq).subscribe((data: ICheckStockRes) => {
      expect(data).toEqual(mockResponse);
    });

    const mockRequest = httpMock.expectOne(
      `/api/device-sales/v1/cart/add-cart-list`
    );
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual(mockReq);
    mockRequest.flush(mockResponse);
  });

  describe('getDataModelProduct', () => {
    it('should return an output which type is observable', () => {
      let result = service.getDataModelProduct();
      result.subscribe((productModel: IHandset[]) => {
        expect(productModel).toBeInstanceOf(Array);
        expect(
          productModel.forEach((value) => {
            expect(value).toMatchObject<IHandset>(value);
          })
        );
      });
    });
  });

  describe('getStockList', () => {
    it('should make a call to the given url', () => {
      const mockResponse: any = {};

      const mockRequestBody: IProductStockRequest = {
        stockType: '',
        locationCodeSource: '1100',
        locationCodeDest: '1100',
        productType: '',
        productSubType: '',
        subStock: '',
        brand: 'APPLE',
        model: 'IPHONE_X',
      };

      service.getStockList(mockRequestBody).subscribe((data: any) => {
        expect(data).toEqual(mockResponse);
      });
      const mockRequest = httpMock.expectOne(
        '/api/device-sales/v1/product/query-stock-omni'
      );
      expect(mockRequest.request.method).toBe('POST');
      expect(mockRequest.request.body).toBe(mockRequestBody);
      mockRequest.flush(mockResponse);
    });
  });

});
