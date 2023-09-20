import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { ErrorService } from 'src/app/core/service/error.service';
import { AlertComponent } from './alert.component';

describe('Alert Component', () => {
  let alert: AlertComponent;
  let injector: Injector;
  let errorService: ErrorService;

  beforeEach(() => {
    errorService = new ErrorService();
    injector = {
      get: jest.fn().mockReturnValue(errorService),
    } as any;
    alert = new AlertComponent(injector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create not standard error', () => {
    errorService.getErrorObservable = jest.fn().mockReturnValueOnce(of({}));
    alert.ngOnInit();
    expect(alert).toBeDefined();
  });

  it('should create standard error', () => {
    errorService.getErrorObservable = jest.fn().mockReturnValueOnce(
      of({
        error: {
          name: 'standard error',
          message: "{ 'developerMessage': '[DW] test' }",
        },
      }),
    );
    JSON.parse = jest
      .fn()
      .mockReturnValueOnce({ developerMessage: '[DW] test' });
    alert.ngOnInit();
    expect(alert).toBeDefined();
  });

  it('can confirm', () => {
    alert.confirmPopup.emit = jest.fn();
    alert.onConfirm();
    expect([alert.isShow, alert.isSuccessAlert]).toEqual([false, false]);
    expect(alert.confirmPopup.emit).toBeCalled();
  });

  it('can confirm', () => {
    alert.cancelPopup.emit = jest.fn();
    alert.onCancel();
    expect([alert.isShow, alert.isSuccessAlert]).toEqual([false, false]);
    expect(alert.cancelPopup.emit).toBeCalled();
  });

  it('detail are toggleable', () => {
    alert.showDetails = false;
    alert.toggleDetails();
    expect(alert.showDetails).toBe(true);
  });

  it('show Popup', () => {
    const functions = () => {return;}
    alert.showPopup({
      isShow: false,
      isSuccessAlert: false,
      title: 'title',
      message: 'msg',
      cancelButtonLabel: 'skip',
      callback: functions
    });
    expect([
      alert.isShow,
      alert.isSuccessAlert,
      alert.title,
      alert.message,
      alert.cancelButtonLabel,
      alert.callback
    ]).toEqual([false, false, 'title', 'msg', 'skip', functions]);
  });
});
