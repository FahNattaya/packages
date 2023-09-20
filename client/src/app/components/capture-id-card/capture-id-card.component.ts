import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import Devices from 'src/app/shared/devices';

@Component({
  selector: 'app-capture-id-card',
  templateUrl: './capture-id-card.component.html',
  styleUrls: ['./capture-id-card.component.scss'],
})
export class CaptureIdCardComponent implements OnInit {
  permission: boolean = false;
  isError: boolean = false;
  image: string = '';
  textButton: string = 'ถ่ายรูป';
  trigger: Subject<void> = new Subject();
  @Output() imageCapture: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    Devices.connectCameraDevice()
      .then(() => {
        this.permission = true;
      })
      .catch(() => {
        this.permission = false;
        this.isError = true;
      });
  }

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  onSnapshot(event: WebcamImage) {
    this.image = event.imageAsDataUrl;
    this.imageCapture.emit(event.imageAsDataUrl);
    this.textButton = 'ถ่ายใหม่';
  }

  onResetImage() {
    if (this.image) {
      this.image = '';
      this.imageCapture.emit('');
      this.textButton = 'ถ่ายรูป';
    }
  }

  onCaptureImage() {
    this.onResetImage();
    this.trigger.next();
  }
}
