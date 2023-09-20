import { PriceDecimalFormatDirective } from './price-decimal-format.directive';
import { DecimalPipe } from '@angular/common';

describe('PriceDecimalFormatDirective', () => {
  let el = {
    nativeElement: {
      textContent: '',
    },
  };
  let decimalPipe: DecimalPipe;
  let directive: PriceDecimalFormatDirective;

  beforeEach(() => {
    decimalPipe = new DecimalPipe('en-EN');
    directive = new PriceDecimalFormatDirective(el as any, decimalPipe);
  });

  it('should create an instance', () => {
    const directive = new PriceDecimalFormatDirective(el as any, decimalPipe);
    expect(directive).toBeTruthy();
  });

  it('return correct format', () => {
    directive.priceString = '277.776';
    directive.ngOnChanges({ priceString: '277.776555' } as any);
    expect(el.nativeElement.textContent).toEqual('277.78 บ.');
  });

  it('return 0 when price string is not a number', () => {
    console.error = jest.fn();
    directive.priceString = 'u50bath';
    directive.ngOnChanges({ priceString: '277.776555' } as any);
    expect(el.nativeElement.textContent).toEqual('0.00 บ.');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
