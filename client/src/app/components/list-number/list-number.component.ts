import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMobileListReadCard } from 'src/app/shared/model/customer.model';

@Component({
  selector: 'app-list-number',
  templateUrl: './list-number.component.html',
  styleUrls: ['./list-number.component.scss'],
})
export class ListNumberComponent implements OnInit {
  @Input() allNumber: IMobileListReadCard[] = [];
  @Output() onEmitMoblieNo: EventEmitter<string> =
    new EventEmitter<string>();

  ngOnInit(): void {
    const indexShowIconGold = this.allNumber.findIndex(
      (data) => data.mobileSegment === 'Gold'
    );
    const indexShowIconPlatinum = this.allNumber.findIndex(
      (data) => data.mobileSegment === 'Platinum'
    );
    this.allNumber = this.allNumber.map((data, index) => ({
      ...data,
      isShowIcon:
        indexShowIconGold === index || indexShowIconPlatinum === index,
    }));
  }
  onValue(mobileNo: string) {
    this.onEmitMoblieNo.emit(mobileNo);
  }
}
