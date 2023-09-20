import { ScannerImeiComponent } from './scanner-imei.component';

describe('ScannerImeiComponent', () => {
  let component: ScannerImeiComponent;

  beforeEach(async () => {
    component = new ScannerImeiComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onScanChange, emit imeiCode, and call beep', () => {
    const spyOnScanChange = jest.spyOn(component, 'onScanChange');
    const spyOnSetImeiCode = jest.spyOn(component.setImeiCode, 'emit');

    component.onScanChange();

    expect(spyOnScanChange).toHaveBeenCalled();
    expect(spyOnSetImeiCode).toHaveBeenCalledWith(component.imeiCode);
  });
});
