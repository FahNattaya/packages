import { PhoneNumbeMarkrFormatDirective } from '../../shared/directive-form/phone-number-mark-format.directive';

describe('PhoneNumbeMarkrFormatDirective', () => {
  let el = {
    nativeElement: { textContent: '' },
  };
  let directive: PhoneNumbeMarkrFormatDirective;

  beforeEach(() => {
    directive = new PhoneNumbeMarkrFormatDirective(el as any);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should hide number in the middle of phone number', () => {
    directive.phoneNumber = '0934000624';
    directive.ngOnChanges({ phoneNumber: '0934000624' } as any);
    const expectPhoneNumber = '093-xxxx-624';
    expect(el.nativeElement.textContent).toEqual(expectPhoneNumber);
  });
});
