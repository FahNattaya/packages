import { IProductCart } from 'src/app/shared/model/cart.model';
import { CartComponent } from './cart.component';
import SweetAlert from 'sweetalert2';
import { fakeAsync } from '@angular/core/testing';
import { CartService } from 'src/app/shared/service/cart.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';

jest.mock('sweetalert2');

describe('CartComponent', () => {
  let component: CartComponent;

  const mockHttp = {
    post: jest.fn(),
    get: jest.fn(),
  };

  const mockCartListService = new CartService(mockHttp as any as HttpClient);

  let mockStore = {
    dispatch: jest.fn(),
    select: jest.fn(),
  };
  let shareService: SharedService;

  beforeEach(() => {
    component = new CartComponent(
      mockCartListService,
      mockStore as any,
      shareService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and call getProductList when ngOnInit', async () => {
    mockStore.select = jest
      .fn()
      .mockReturnValueOnce(of({}))
      .mockReturnValueOnce(
        of({
          locationCode: '1100',
          username: 'test',
        }),
      )
      .mockReturnValueOnce(of({}));
    component = new CartComponent(
      mockCartListService,
      mockStore as any,
      shareService,
    );

    await component.ngOnInit();
    expect(component.userData).toBeDefined();
  });

  it('should return format dataTestId cartCheckbox-`index`', () => {
    expect(component.formatDataTestId(1)).toEqual('cartCheckbox-1');
  });

  it('should return format dataTestId cartCheckbox-`index`', () => {
    expect(component.formatDataTestId(1)).toEqual('cartCheckbox-1');
  });

  it('should show alert when model is match and matcode is MATCODE_NON_AIS and trade, trade modelColor is valid and imei color not match product color', () => {
    const imei = {
      model: '\tIPHONE1125',
      matcode: 'MATCODE_NON_AIS',
      color: 'BLACK',
    };

    component.productListData = [
      {
        model: '\tIPHONE1125',
        trade: {
          modelColor: 'GOLD',
        },
      },
    ] as IProductCart[];

    component.onConfirmImei(imei, 0);
    expect(SweetAlert.fire).toHaveBeenCalled();
  });

  it('should show alert when model is match and matcode is MATCODE_NON_AIS and trade, trade modelColor is valid and imei color match product color', () => {
    const imei = {
      model: '\tIPHONE1125',
      matcode: 'MATCODE_NON_AIS',
      color: 'ooo',
    };

    component.productListData = [
      {
        model: '\tIPHONE1125',
        trade: {
          modelColor: 'ooo',
        },
      },
    ] as IProductCart[];

    component.onConfirmImei(imei, 0);
    expect(SweetAlert.fire).toBeCalledWith({
      title:
        'ข้อมูล IMEI ไม่ถูกต้อง กรุณาตรวจสอบเครื่อง ยี่ห้อ/รุ่น/สี ที่เลือกมา',
      icon: 'error',
    });
  });

  it('should set isScanImeiSuccess to false when isAlertConfirmed is no', fakeAsync(() => {
    const imei = {
      model: '\tIPHONE1125',
      matcode: 'MATCODE_NON_AIS',
      color: 'ooo',
      price: 65,
    };
    component.productListData = [
      {
        model: '\tIPHONE1125',
        trade: {
          modelColor: 'ooo',
        },
      },
    ] as IProductCart[];

    component.onConfirmImei(imei, 0);
    expect(SweetAlert.fire).toBeCalledWith({
      title:
        'ข้อมูล IMEI ไม่ถูกต้อง กรุณาตรวจสอบเครื่อง ยี่ห้อ/รุ่น/สี ที่เลือกมา',
      icon: 'error',
    });
    // tick(500);
    expect(component.isScanImeiSuccess).toBeFalsy();
  }));

  it('should set isScanImeiSuccess to true when matcode is not MATCODE_NON_AIS color is match', () => {
    const imei = {
      model: '\tIPHONE1125',
      matcode: 'MATCODE_AIS',
      color: 'BLACK',
    };

    component.productListData = [
      {
        model: '\tIPHONE1125',
        trade: {
          modelColor: 'BLACK',
        },
        color: 'BLACK',
      },
    ] as IProductCart[];

    mockHttp.post = jest.fn().mockReturnValueOnce(of({}));
    component.onConfirmImei(imei, 0);

    expect(component.isScanImeiSuccess).toBeTruthy();
  });

  it('should calculate the total net price correctly', () => {
    const productListData = [
      {
        netPrice: 10,
        productChecked: true,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
      {
        netPrice: 15,
        productChecked: false,
        mobileCare: { isBuyDeviceCare: true, option: { price: 5 } },
      },
      {
        netPrice: 20,
        productChecked: false,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
      {
        netPrice: 30,
        productChecked: true,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
    ] as IProductCart[];

    component.productListData = productListData;
    component.getTotalNetPrice();

    expect(component.totalNetPrice).toBe(10 + 30);
  });

  it('should calculate the total net price with mobile care correctly', () => {
    const productListData = [
      {
        netPrice: 10,
        productChecked: true,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
      {
        netPrice: 15,
        productChecked: false,
        mobileCare: { isBuyDeviceCare: true, option: { price: 5 } },
      },
      {
        netPrice: 20,
        productChecked: true,
        mobileCare: { isBuyDeviceCare: true, option: { price: 5 } },
      },
      {
        netPrice: 30,
        productChecked: true,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
    ] as IProductCart[];

    component.productListData = productListData;
    component.getTotalNetPrice();

    expect(component.totalNetPrice).toBe(10 + 20 + 30 + 5);
  });

  it('should emit the correct total net price', () => {
    const productListData = [
      {
        netPrice: 10,
        productChecked: true,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
      {
        netPrice: 15,
        productChecked: false,
        mobileCare: { isBuyDeviceCare: true, option: { price: 5 } },
      },
      {
        netPrice: 20,
        productChecked: false,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
      {
        netPrice: 30,
        productChecked: true,
        mobileCare: { isBuyDeviceCare: false, option: { price: 5 } },
      },
    ] as IProductCart[];

    component.productListData = productListData;
    const emitSpy = jest.spyOn(component.emitSummaryPrice, 'emit');
    component.getTotalNetPrice();

    expect(emitSpy).toHaveBeenCalledWith(10 + 30);
  });

  describe('delete product from cart', () => {
    it('can delete multiple product from cart', () => {
      mockHttp.post.mockReturnValueOnce(of({ resultMessage: 'Success' }));
      component.userData = { username: 'mcUser' } as any;
      component.productListData = [
        { productChecked: true, transactionId: 1 },
        { productChecked: false, transactionId: 2 },
        { productChecked: true, transactionId: 3 },
      ] as any;

      component.onDeleteProductSelected();
      expect(component.productListData).toEqual([
        { productChecked: false, transactionId: 2 },
      ]);
    });

    it('can alert when cannot delete item', () => {
      mockHttp.post.mockReturnValueOnce(of({ resultMessage: 'error' }));
      component.userData = { username: 'mcUser' } as any;
      component.productListData = [
        { productChecked: true, transactionId: 1 },
        { productChecked: false, transactionId: 2 },
      ] as any;

      component.onDeleteProductSelected();
      expect(component.productListData).toEqual([
        { productChecked: true, transactionId: 1 },
        { productChecked: false, transactionId: 2 },
      ]);
    });

    it('delete an item from cart', () => {
      mockHttp.post.mockReturnValueOnce(of({ resultMessage: 'Success' }));
      component.userData = { username: 'mcUser' } as any;
      component.productListData = [
        { productChecked: true, transactionId: 1 },
        { productChecked: false, transactionId: 2 },
      ] as any;
      component.onDeleteProduct(component.productListData![0]);
      expect(component.productListData).toEqual([
        { productChecked: false, transactionId: 2 },
      ]);
    });

    it('delete alert when cannot delete an item', () => {
      mockHttp.post.mockReturnValueOnce(of({ resultMessage: 'failed' }));
      component.userData = { username: 'mcUser' } as any;
      component.productListData = [
        { productChecked: true, transactionId: 1 },
        { productChecked: false, transactionId: 2 },
      ] as any;
      component.onDeleteProduct(component.productListData![0]);
      expect(component.productListData).toEqual([
        { productChecked: true, transactionId: 1 },
        { productChecked: false, transactionId: 2 },
      ]);
    });

    test('confirm delete not all product', () => {
      component.productListData = [
        { productChecked: true, transactionId: 1 },
        { productChecked: false, transactionId: 2 },
      ] as any;
      component.isAllProductChecked = false;
      component.onConfirmDelete(true, {} as any);

      expect(SweetAlert.fire).toHaveBeenCalled();
    });

    it('confirm delete all product', async () => {
      jest.useFakeTimers();
      mockHttp.post.mockReturnValueOnce(of({ resultMessage: 'Success' }));
      component.getTotalNetPrice = jest.fn();
      component.isEnablePayNow = jest.fn();
      component.userData = { username: 'mcUser' } as any;
      component.productListData = [
        { productChecked: true, transactionId: 1 },
        { productChecked: true, transactionId: 2 },
      ] as any;
      component.isAllProductChecked = true;
      SweetAlert.fire = jest.fn().mockReturnValue(
        new Promise((resolve) => {
          resolve({ isDismissed: true, dismiss: '' });
        }),
      );
      component.onConfirmDelete(true, {} as any);
      await jest.runAllTimersAsync();

      expect(SweetAlert.fire).toHaveBeenCalled();
      expect(component.productListData!.length).toBe(0);
      jest.useRealTimers();
    });
  });

  test('product selected', () => {
    component.productListData = [
      { productChecked: true, transactionId: 1 },
      { productChecked: false, transactionId: 2 },
    ] as any;
    component.getTotalNetPrice = jest.fn();
    component.isEnablePayNow = jest.fn();
    component.onProductChecked({ target: { checked: true } } as any, 1);
    expect(component.productListData![1].productChecked).toBeTruthy();
    expect(component.isProductChecked).toBeTruthy();
  });

  test('all product selected', () => {
    component.productListData = [
      { productChecked: true, transactionId: 1 },
      { productChecked: false, transactionId: 2 },
    ] as any;
    component.getTotalNetPrice = jest.fn();
    component.isEnablePayNow = jest.fn();
    component.onAllProductChecked({ target: { checked: true } } as any);
    component.productListData!.forEach((e) =>
      expect(e.productChecked).toBeTruthy(),
    );
  });

  describe('Get Product list', () => {
    it('get cart error', async () => {
      jest.useFakeTimers();
      mockHttp.get.mockReturnValueOnce(of({ message: 'error' }));
      mockStore.select.mockReturnValueOnce(of({ mobileNo: '88' }));
      component.userData = { locationCode: '1100' } as any;
      component.getProductList();
      await jest.runAllTimersAsync();

      expect(component.isError).toBeTruthy();
      jest.useRealTimers();
    });

    it('get cart error when empty data', async () => {
      jest.useFakeTimers();
      mockHttp.get.mockReturnValueOnce(of({ message: "Can't find Data" }));
      mockStore.select.mockReturnValueOnce(of({ mobileNo: '88' }));
      component.userData = { locationCode: '1100' } as any;
      component.isEnablePayNow = jest.fn();
      component.getProductList();
      await jest.runAllTimersAsync();

      expect(component.isCartListEmpty).toBeTruthy();
      jest.useRealTimers();
    });

    it('get cart data', async () => {
      jest.useFakeTimers();
      mockHttp.get.mockReturnValueOnce(
        of([{ device: { imei: '0' }, package: {} }]),
      );
      mockStore.select.mockReturnValueOnce(of({ mobileNo: '88' }));
      component.userData = { locationCode: '1100' } as any;
      component.isEnablePayNow = jest.fn();
      component.getProductList();
      await jest.runAllTimersAsync();

      jest.useRealTimers();
    });
  });
});
