import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

describe('ProductSellingService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SharedService],
    });
    service = TestBed.inject(SharedService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct path', () => {
    const path = 'path';
    expect(service.getUrl(path)).toEqual(`${environment.API_URL}/v1/path`);
  });

  it('test method numberWithComma', () => {
    expect(service.numberWithComma(100)).toEqual('100');
    expect(service.numberWithComma(1000)).toEqual('1,000');
    expect(service.numberWithComma(1000000)).toEqual('1,000,000');
  });

  it('round up when third decimal point has more than 5', () => {
    expect(service.customRound(900.985)).toEqual(900.98);
    expect(service.customRound(900.98500001)).toEqual(900.99);
    expect(service.customRound(900.986)).toEqual(900.99);
  });

  test('generate transaction id', () => {
    const result = service.generateTransactionId();
    expect(result).toBeDefined();
  });

  describe('Device/flatform detect', () => {
    const iosDevice =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/29.0 Mobile/15E148 Safari/605.1.15';
    const mobile =
      'Mozilla/5.0 (Mobile; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36';
    const windows =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36';
    const tablet =
      'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/605.1.15';

    test('detect ios device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: iosDevice,
      });
      expect(service.checkDevice().isIOS).toBeTruthy();
    });

    test('detect mobile device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: mobile,
      });
      expect(service.checkDevice().isIOS).toBeFalsy();
      expect(service.checkDevice().isMobileDevice).toBeTruthy();
    });

    test('detect tablet device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: tablet,
      });
      expect(service.checkDevice().isIOS).toBeTruthy();
      expect(service.checkDevice().isMobileDevice).toBeFalsy();
      expect(service.checkDevice().isTabletDevice).toBeTruthy();
    });

    test('detect tablet device', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: windows,
      });
      expect(service.checkDevice().isIOS).toBeFalsy();
      expect(service.checkDevice().isMobileDevice).toBeFalsy();
      expect(service.checkDevice().isTabletDevice).toBeFalsy();
      expect(service.checkDevice().isDesktopDevice).toBeTruthy();
    });
  });

  test('call function with timeout rejected', () => {
    jest.useFakeTimers();
    const tenSec = new Promise((resolve) => {
      setTimeout(() => {
        resolve(10);
      }, 10);
    });
    expect(service.callFunctionWithTimeout(tenSec, 1)).rejects.toThrow(
      'function call timeout limit reached',
    );
    jest.runAllTimers();
  });

  test('call function with timeout resolved', () => {
    jest.useFakeTimers();
    const tenSec = new Promise((resolve) => {
      setTimeout(() => {
        resolve(42);
      }, 10);
    });
    expect(service.callFunctionWithTimeout(tenSec, 35)).resolves.toEqual(42);
    jest.runAllTimers();
  });

  describe('Calculate Discount', () => {
    test('discount', () => {
      const discount = service.calculateDiscount(
        {
          vatRate: '7',
          specialDiscountBy: 'B',
          specialDiscountIncludeVat: 300,
          discountExcludeBy: 'B',
          discountExcludeVat: 200,
          tradePriceExcludeVat: 300,
        } as any,
        100,
        200,
      );
      expect(discount).toEqual({ discount: 514, priceInclude: 321 });
    });
  });

  test('Map remark payment', () => {
    const trancsaction = {
      payment: {
        paymentMethod: 'CC',
        installmentTerms: '10',
      },
      main_promotion: {
        campaign: { campaignName: 'test' },
        trade: { orderType: 'test' },
      },
      package: { packageName: 'pkg' },
      mobileCare: { productType: 'care' },
    };
    const remark = service.onMapPaymentRemark(trancsaction);
    expect(remark).toContain('pkg');
    expect(remark).toContain('[CC]');
  });

  test('mapping data to create order list', () => {
    const trancsaction = {
      payment: {
        paymentMethod: 'CC',
        installmentTerms: '10',
      },
      main_promotion: {
        campaign: { campaignName: 'test' },
        trade: { orderType: 'test', privileges: [] },
      },
      package: { packageName: 'pkg' },
      mobileCare: { productType: 'care', isBuyDeviceCare: true },
      device_care_payment: { amount: '' },
      device: { productType: 'DEVICE' },
      customer: { idCardNo: '1234' },
      simCard: { mobileNo: '88' },
    };
    const order = service.onMapReqCreateOrderList(trancsaction);
    expect(order).toMatchObject({
      paymentMethod: 'CC',
      installmentTerm: '10',
    });
  });
});
