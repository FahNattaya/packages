import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scanner-imei',
  templateUrl: './scanner-imei.component.html',
  styleUrls: ['./scanner-imei.component.scss'],
})
export class ScannerImeiComponent {
  @Input() isStartScan: boolean = false;
  @Output() setImeiCode: EventEmitter<string> = new EventEmitter<string>();
  imeiCode: string = '';

  onScanChange() {
    this.setImeiCode.emit(this.imeiCode);
  }
}
