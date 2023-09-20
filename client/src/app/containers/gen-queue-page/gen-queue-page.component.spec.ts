import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';
import { PaymentService } from 'src/app/shared/service/payment.service';
import { GenQueuePageComponent } from './gen-queue-page.component';
import { SharedService } from 'src/app/shared/service/shared.service';
import { QueueService } from 'src/app/shared/service/queue.service';

describe('GenQueuePageComponent', () => {
  let component: GenQueuePageComponent;
  let mockRouter = {
    navigate: jest.fn(),
  } as unknown as Router;
  let mockStore: any = {
    dispatch: jest.fn(),
    select: jest.fn(),
  };
  let mockCartService: CartService;
  let sharedService: SharedService;
  let mockFormBuilder: any = {
    group: jest.fn(),
  };
  let mockPaymentService: PaymentService;
  let queueService: QueueService;
  beforeEach(() => {
    component = new GenQueuePageComponent(
      mockRouter,
      mockStore,
      mockFormBuilder,
      mockCartService,
      mockPaymentService,
      sharedService,
      queueService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to next page', () => {
  //   jest.spyOn(router, 'navigate');
  //   component.onNext();
  //   expect(router.navigate).toHaveBeenCalledWith([PathConstant.SUCCESS_QUEUE_PAGE]);
  // });

  // it('should navigate to previous page', () => {
  //   jest.spyOn(router, 'navigate');
  //   component.onBack();
  //   expect(router.navigate).toHaveBeenCalledWith([PathConstant.SIGN_CONTRACT_PAGE]);
  // });

  // it('should return mobileNo control in corrected format for validator', () => {
  //   const mobileNoControl = component.mobileNo;
  //   if (mobileNoControl.validator) {
  //     const requiredValidator = mobileNoControl.validator({} as FormControl);
  //     const patternValidator = mobileNoControl.validator({ value: '0123456789' } as FormControl);
  //     expect(requiredValidator).toEqual({ "required": true });
  //     expect(patternValidator).toBeNull();
  //   }
  // });

  // it('should return queueNo control in corrected format for validator', () => {
  //   const queueNoControl = component.queueNo;
  //   if (queueNoControl.validator) {
  //     const requiredValidator = queueNoControl.validator({} as FormControl);
  //     const patternValidator = queueNoControl.validator({ value: 'A123' } as FormControl);
  //     expect(requiredValidator).toEqual({ "required": true });
  //     expect(patternValidator).toBeNull();
  //   }
  // });
});
