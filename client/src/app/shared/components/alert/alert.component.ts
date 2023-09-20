import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/core/service/error.service';

interface IShowPopupData {
  isShow: boolean;
  isSuccessAlert: boolean;
  title: string;
  message: string;
  cancelButtonLabel: string;
  callback: any;
}
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() confirmButtonLabel: string = 'OK';
  @Input() cancelButtonLabel?: string;
  @Output() confirmPopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelPopup: EventEmitter<void> = new EventEmitter<void>();
  isShow: boolean = false;
  isSuccessAlert: boolean = false;
  title: string = 'เกิดข้อผิดพลาด!';
  message: string = '';
  warningImagePath: string = 'assets/images/warning.png';
  succcessImagePath: string = 'assets/images/success.png';
  errorSubscription: Subscription | undefined;
  showDetails = false;
  errorDetail = '';
  resultCode = '';
  callback: any

  constructor(private injector: Injector) { }
  ngOnInit(): void {
    const errorService = this.injector.get(ErrorService);
    this.errorSubscription = errorService
      .getErrorObservable()
      .subscribe((params) => {
        if (params.error?.name === 'standard error') {
          let errorDetail = JSON.parse(params.error?.message);
          this.message = errorDetail.Error;
          this.resultCode = errorDetail.resultCode;
          this.errorDetail = errorDetail.resultDescription;
          this.isShow = true;
          this.isSuccessAlert = params?.isSuccessAlert;
        } else {
          this.message =
            params.error?.errors ||
            params?.developerMessage ||
            params?.customMessage ||
            params.error?.message ||
            params.statusText;
          this.errorDetail = params.error?.developerMessage || params?.message;
          this.isShow = true;
          this.isSuccessAlert = params?.isSuccessAlert;
          this.cancelButtonLabel = params?.cancelButtonLabel;
          this.callback = params.callback;
        }
      });
  }

  onConfirm() {
    this.isShow = false;
    this.isSuccessAlert = false;
    this.cancelButtonLabel = '';
    this.confirmPopup.emit();
  }

  onCancel() {
    this.isShow = false;
    this.isSuccessAlert = false;
    this.cancelButtonLabel = '';
    if (this.callback) {
      this.callback();
    }
    this.cancelPopup.emit();
  }

  showPopup(showPopupData: IShowPopupData) {
    const { isShow, isSuccessAlert, message, title, cancelButtonLabel, callback } = showPopupData;
    this.isShow = isShow;
    this.isSuccessAlert = isSuccessAlert;
    this.title = title;
    this.message = message;
    this.cancelButtonLabel = cancelButtonLabel;
    this.callback = callback

  }
  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
