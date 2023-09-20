import { IMobileCareSelected } from 'src/app/shared/model/service-care.model';
import { ServiceCarePageComponent } from './service-care-page.component';
import { CartService } from 'src/app/shared/service/cart.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store-ngrx/app.state';
import { Store } from '@ngrx/store';
import { ErrorService } from 'src/app/core/service/error.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { PathConstant } from 'src/app/shared/constant/path.constant';

describe('ServiceCarePageComponent', () => {
  let component: ServiceCarePageComponent;
  let router = {
    navigate: jest.fn(),
  } as unknown as Router;
  let store: Store<AppState> = {
    select: jest.fn(),
    dispatch: jest.fn()
  } as unknown as Store<AppState>
  let cartService: CartService = {
    cartCount: 0,
    updateTransaction: jest.fn()
  } as unknown as CartService
  let errorService: ErrorService

  beforeEach(async () => {
    component = new ServiceCarePageComponent(
      router,
      store,
      cartService,
      errorService,
    )
    errorService = TestBed.inject(ErrorService);
    component.transactionId = '';
    component.dataMobileCareSelected = undefined;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init all status is false', () => {
    const checkstatus = component.isLoading
      || component.isLimitMobileCare
      || component.isMobileCareFormValid

    expect(checkstatus).toBe(false)
  })

  it('should set status validate form service care', () => {
    component.getMobileCareFormValid(true)

    expect(component.isMobileCareFormValid).toBe(true)
  })

  it('should set status limit service care', () => {
    component.getLimitMoblieCare(true)

    expect(component.isLimitMobileCare).toBe(true)
  })

  const mobileCareSelected: IMobileCareSelected = {
    email: 'email',
    title: 'title',
    productType: 'productType',
    matCodeCarePlus: 'matCodeCarePlus',
    option: {
      name: 'name',
      price: 'price',
      promotionCode: 'promotionCode',
      offeringCode: '',
    }
  }

  it('should set dataSelectedMobileCare to the provided data', () => {
    component.getDataMobileCareSelected(mobileCareSelected);

    expect(component.dataMobileCareSelected).toBe(mobileCareSelected);
  });

  it('should return false when isMobileCareFormValid is false', () => {
    component.isMobileCareFormValid = false;
    component.isLimitMobileCare = false;

    expect(component.buttonNextEnableStatus).toBe(false);
  });

  it('should return false when isLimitMobileCare is true', () => {
    component.isMobileCareFormValid = true;
    component.isLimitMobileCare = true;

    expect(component.buttonNextEnableStatus).toBe(false);
  });

  it('should return true when all conditions are correct', () => {
    component.isMobileCareFormValid = true;
    component.isLimitMobileCare = false;

    expect(component.buttonNextEnableStatus).toBe(true);
  });

  it('should return first transaction id in list', async () => {
    store.select = jest.fn().mockReturnValueOnce(of([
      {
        transactionId: "new1",
      },
      {
        transactionId: "new2",
      }
    ]))

    expect(await component.getTransactionId()).toBe('new1')
  })

  it('should not return any transaction id other than the first transaction id', async () => {
    store.select = jest.fn().mockReturnValueOnce(of([
      {
        transactionId: "new1",
      },
      {
        transactionId: "new2",
      }
    ]))

    expect(await component.getTransactionId()).not.toBe('new2')
  })


  it('should go to care page when update transaction success', async () => {
    // jest.spyOn(errorService, 'handleError').mockImplementation();
    store.select = jest.fn().mockReturnValueOnce(of([
      {
        transactionId: "new1",
      },
      {
        transactionId: "new2",
      }
    ]))
    component.dataMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'AppleCare+',
      option: {
        name: 'name',
        price: '5,500',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    }
    jest.spyOn(cartService, 'updateTransaction').mockReturnValue(of({
      someone: 'someThing'
    }))

    await component.updateMobileCare();

    expect(router.navigate).toHaveBeenCalledWith([
      PathConstant.CART_PAGE,
    ]);
  });

  it('should tranform data when select AppleCare+', async () => {
    store.select = jest.fn().mockReturnValueOnce(of([
      {
        transactionId: "new1",
      },
      {
        transactionId: "new2",
      }
    ]))
    component.dataMobileCareSelected = {
      email: 'email',
      title: 'title',
      productType: 'AppleCare+',
      option: {
        name: 'title',
        price: '5,500',
        promotionCode: 'promotionCode',
        offeringCode: '',
      },
      matCodeCarePlus: 'matCodeCarePlus',
    }
    jest.spyOn(cartService, 'updateTransaction').mockReturnValue(of({
      someone: 'someThing'
    }))

    await component.updateMobileCare();


    expect(cartService.updateTransaction).toBeCalledWith(
      "new1",
      {
        "DATA.device_care_package": {
          "accountFees": [],
          "costProductPrice": "5,500",
          "crossMatCode": "matCodeCarePlus",
          "customAttributes": {
            "promotionCode": "promotionCode",
            "promotionName": "title",
            "offeringCode": '',
          },
          "email": "email",
          "isBuyDeviceCare": true,
          "orderFees": [],
          "promotionCode": "promotionCode",
          "reason": "",
          "title": "title"
        },
        "DATA.device_care_payment": {
          "amount": 5500,
          "email": "email",
          "matCodeCarePlus": "matCodeCarePlus"
        },
        "DATA.mobile_care_package": {
          "accountFees": [],
          "orderFees": []
        }
      })
  })


});
