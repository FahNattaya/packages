import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { ICreateCompensation } from '../model/cart.model';

describe('CartlistService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update cartSource on updateCart', () => {
    const mockCart: any = [
      {
        body: {
          resultCode: '',
          resultDescription: '',
          developerMessage: '',
          data: {
            productList: [],
          },
        },
        status: '',
      },
    ];
    const cartSourceSpy = jest.spyOn(service['cartSource'], 'next');
    service.updateCart(mockCart);
    expect(cartSourceSpy).toHaveBeenCalledWith(mockCart);
    httpMock.verify();
  });

  it('should send a POST request to add cart product', (done) => {
    const mockRequestBody: any = { productId: 1, quantity: 2 };
    const mockResponse: any = {
      success: true,
    };
    const url = `/api/device-sales/v1/cart/addCart`;

    service.addToCart(mockRequestBody).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequestBody);
    req.flush(mockResponse);
    httpMock.verify();
  });
  describe('createCompensation', () => {
    const mockRequestBody: ICreateCompensation = {
      transactionId: '123234445556',
    };
    const url = '/api/device-sales/v1/cart/create-compensation';
    let req: TestRequest;
    beforeEach(() => {
      service.createCompensation(mockRequestBody).subscribe(() => {});
      req = httpMock.expectOne(url);
    });
    it('should make a POST call to the given url', () => {
      expect(req.request.method).toBe('POST');
      expect(req.request.url).toBe(url);
      httpMock.verify();
    });

    it('should make a POST call with the given transaction id', () => {
      expect(req.request.body).toBe(mockRequestBody);
    });
  });
});
