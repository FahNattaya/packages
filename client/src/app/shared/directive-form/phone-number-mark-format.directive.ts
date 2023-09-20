import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPhoneNumbeMarkrFormat]'
})
export class PhoneNumbeMarkrFormatDirective {
  @Input('appPhoneNumbeMarkrFormat') phoneNumber: string | undefined;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.phoneNumber && changes['phoneNumber']) {
      const formattedValue = this.formatPhoneNumber(this.phoneNumber);
      this.el.nativeElement.textContent = formattedValue;
    }
  }

  private formatPhoneNumber(value: string): string {
    if (!value) return '';
    const areaCode = value.slice(0, 3);
    // const prefix = value.slice(3, 7);
    const suffix = value.slice(7, 10);

    return `${areaCode}-xxxx-${suffix}`;
  }
}
