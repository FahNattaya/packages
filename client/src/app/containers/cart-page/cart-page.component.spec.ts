import { CartService } from 'src/app/shared/service/cart.service';
import { CartPageComponent } from './cart-page.component';
import { Router } from '@angular/router';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let mockRouter = {
    navigate: jest.fn(),
  } as unknown as Router;
  let mockStore: any = {
    dispatch: jest.fn(),
  };
  let mockCartListService: CartService
  beforeEach(() => {
    component = new CartPageComponent(
      mockRouter,
      mockStore,
      mockCartListService
      );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set getSummaryPrice', () => {
    const summaryPrice: number = 1500

    component.getSummaryPrice(summaryPrice)

    expect(component.summaryPrice).toEqual(summaryPrice)
  })

  it('should navigate to payment method page on pay now button click', () => {
    component.onPayNow();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/payment-method']);
  });
});

