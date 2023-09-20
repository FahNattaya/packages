import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPriceDecimalFormat]',
})
export class PriceDecimalFormatDirective {
  @Input('appPriceDecimalFormat') priceString: any;

  constructor(private el: ElementRef, private decimalPipe: DecimalPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.priceString && changes['priceString']) {
      const twoDecimalPrice = this.convertToTwoDecimal(this.priceString);
      const formattedPrice = this.decimalPipe.transform(
        twoDecimalPrice,
        '1.2-2'
      );
      this.el.nativeElement.textContent = `${formattedPrice} บ.`;
      this.el.nativeElement.value = `${formattedPrice} บ.`;
    }
  }

  private convertToTwoDecimal(value: string): number {
    const priceNumber = parseFloat(value);

    if (isNaN(priceNumber)) {
      console.error('Invalid price input:', value);
      return 0;
    }

    return parseFloat(priceNumber.toFixed(2));
  }
}
