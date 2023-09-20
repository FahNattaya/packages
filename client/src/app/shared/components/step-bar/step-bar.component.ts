import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

type IStepType = 'cart' | 'payment' | 'complete' | 'allComplete';
type IStepStatus = 'default' | 'waiting' | 'success';

@Component({
  selector: 'app-step-bar',
  templateUrl: './step-bar.component.html',
  styleUrls: ['./step-bar.component.scss'],
})
export class StepBarComponent implements OnChanges {
  @Input() stepWaiting: IStepType = 'cart';
  steps: { step: IStepType; status: IStepStatus; label: string }[] = [
    { step: 'cart', status: 'waiting', label: 'ตะกร้าสินค้า' },
    { step: 'payment', status: 'default', label: 'จ่ายเงิน' },
    { step: 'complete', status: 'default', label: 'เสร็จสิ้น' },
  ];
  ngOnChanges(changes: SimpleChanges): void {
    this.onChangeStep(changes['stepWaiting'].currentValue);
  }

  onChangeStep(stepWaiting: IStepType) {
    this.steps = this.steps.map((stepData, indexStep) => {
      if (stepWaiting === 'allComplete') {
        stepData.status = 'success';
      } else {
        const isComplete = stepWaiting === 'complete';
        const isWaiting = stepData.step === stepWaiting;

        if (isWaiting) {
          stepData.status = 'waiting';
        } else {
          const isFirst = indexStep === 0;
          const isSecond = indexStep === 1;
          if (isComplete) {
            stepData.status = 'success';
          } else {
            if (isFirst) {
              stepData.status = 'success';
            }
            if (isSecond) {
              stepData.status = 'default';
            }
          }
        }
      }
      return stepData;
    });
  }
}
