import { ProductSellingTradeComponent } from './product-selling-trade.component';
import { SharedService } from 'src/app/shared/service/shared.service';
import { SimpleChange } from '@angular/core';

interface ITrades {
  tradeDiscountID: string;
  tradeName: string;
  normalPrice: number;
  priceDiscount: number;
  durationContract: string;
  advancePay: { amount: string };
  package: string;
  freeGoods: string;
}

const mockTradeData: ITrades[] = [
  {
    tradeDiscountID: '12345',
    tradeName: 'TPXXXXXX01',
    normalPrice: 43900,
    priceDiscount: 11000,
    durationContract: '2',
    advancePay: { amount: '3745' },
    package: '399',
    freeGoods: 'ตุ๊กตาเอไอเอาอุ่นใจ',
  },
  {
    tradeDiscountID: '12346',
    tradeName: 'TPXXXXXX02',
    normalPrice: 21900,
    priceDiscount: 11000,
    durationContract: '2',
    advancePay: { amount: '2745' },
    package: '499',
    freeGoods: 'ตุ๊กตาเอไอเอาอุ่นมาก',
  },
];

describe('ProductSellingTradeComponent', () => {
  let component: ProductSellingTradeComponent;
  let sharedService = new SharedService();
  let store: any = {
    dispatch: jest.fn(),
    select: jest.fn(),
  };

  beforeEach(async () => {
    component = new ProductSellingTradeComponent(store, sharedService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('test function', () => {
    it('[netPrice] should equal normalPrice - priceDiscount', () => {
      const mockTrade = mockTradeData[0];
      expect(
        component.netPrice(mockTrade.normalPrice, mockTrade.priceDiscount)
      ).toEqual('32900');
    });

    it('[tradeNumber] should equal input index type number', () => {
      component.selectTrade(1);
      expect(component.tradeNumber).toEqual(1);

      component.selectTrade(1);
      expect(component.tradeNumber).not.toEqual('1');
    });

    it('[showPackage] should be returned in the specified format.', () => {
      expect(component.showPackage(499, null)).toEqual('499 บาทขึ้นไป');
      expect(component.showPackage(1499, null)).toEqual('1,499 บาทขึ้นไป');
      expect(component.showPackage(499, 699)).toEqual('499-699 บาท');
      expect(component.showPackage(1299, 1499)).toEqual('1,299-1,499 บาท');
    });

    it('[selectTrade] should set tradeNumber on click', () => {
      component.selectTrade(1);
      expect(component.tradeNumber).toEqual(1);
    });

    it('[selectTrade] should emit on click', () => {
      jest.spyOn(component.selectedTrade, 'emit');
      component.selectTrade(1);
      expect(component.selectedTrade.emit).toHaveBeenCalled();
      expect(component.selectedTrade.emit).toHaveBeenCalledWith(1);
    });

    it('should set tradeNumber to 0', () => {
      const changes = { trades: new SimpleChange(null, null, true) };
      component.ngOnChanges(changes);
      expect(component.tradeNumber).toBe(0);
    });

    it('should set isTradesEmpty to true if trades is empty', () => {
      const trades: ITrades[] = [];
      const changes = { trades: new SimpleChange(null, trades, false) };
      component.ngOnChanges(changes);
      expect(component.isTradesEmpty).toBe(true);
    });

    it('should not set isTradesEmpty if trades is not empty', () => {
      const trades: ITrades[] = mockTradeData;
      const changes = { trades: new SimpleChange(null, trades, false) };
      component.ngOnChanges(changes);
      expect(component.isTradesEmpty).toBe(false);
    });
  });
});
