import { fakeAsync, tick } from '@angular/core/testing';
import { CaptureIdCardComponent } from './capture-id-card.component';

describe('CaptureIdCardComponent', () => {
  let component: CaptureIdCardComponent;

  Object.defineProperty(navigator, 'mediaDevices', {
    value: { getUserMedia: jest.fn() },
  });

  beforeEach(async () => {
    component = new CaptureIdCardComponent();
  });

  it('should create', fakeAsync(() => {
    navigator.mediaDevices.getUserMedia = jest.fn().mockResolvedValueOnce({});
    component.ngOnInit();
    tick();
    expect(component).toBeTruthy();
    expect(component.permission).toBeTruthy();
  }));

  it('init with no permission', fakeAsync(() => {
    navigator.mediaDevices.getUserMedia = jest.fn().mockRejectedValueOnce({});
    component.ngOnInit();
    tick();
    expect(component).toBeTruthy();
    expect(component.permission).toBeFalsy();
    expect(component.isError).toBeTruthy();
  }));

  it('can get trigger', () => {
    expect(component.$trigger).toEqual(component.trigger.asObservable());
  });

  test('snapshot emit event', () => {
    component.imageCapture.emit = jest.fn();
    component.onSnapshot({} as any);
    expect(component.imageCapture.emit).toHaveBeenCalled();
  });

  it('should reset image', () => {
    component.image = 'test';
    component.imageCapture.emit = jest.fn();
    component.onResetImage();
    expect(component.image).toEqual('');
    expect(component.imageCapture.emit).toHaveBeenCalled();
  });

  it('reset then capture image', () => {
    component.onResetImage = jest.fn();
    component.trigger.next = jest.fn();
    component.onCaptureImage();
    expect(component.onResetImage).toHaveBeenCalled();
    expect(component.trigger.next).toHaveBeenCalled();
  });
});
