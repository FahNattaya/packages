import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBarComponent } from './step-bar.component';
import { SimpleChanges } from '@angular/core';

describe('StepBarComponent', () => {
  let component: StepBarComponent;
  let fixture: ComponentFixture<StepBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Change step and status', () => {
    component.onChangeStep('payment');
    expect(component.steps).toEqual([
      { step: 'cart', status: 'success', label: 'ตะกร้าสินค้า' },
      { step: 'payment', status: 'waiting', label: 'จ่ายเงิน' },
      { step: 'complete', status: 'default', label: 'เสร็จสิ้น' },
    ]);
  });

  it('Step is complete', () => {
    const component = new StepBarComponent();
    component.onChangeStep('complete');
    expect(component.steps[0].status).toEqual('success');
    expect(component.steps[1].status).toEqual('success');
    expect(component.steps[2].status).toEqual('waiting');
  });

  it('Step is payment', () => {
    const component = new StepBarComponent();
    component.onChangeStep('payment');
    expect(component.steps[0].status).toEqual('success');
    expect(component.steps[1].status).toEqual('waiting');
    expect(component.steps[2].status).toEqual('default');
  });

  it('Step is cart', () => {
    const component = new StepBarComponent();
    component.onChangeStep('cart');
    expect(component.steps[0].status).toEqual('waiting');
    expect(component.steps[1].status).toEqual('default');
    expect(component.steps[2].status).toEqual('default');
  });

  it('Step is all complete', () => {
    const component = new StepBarComponent();
    component.onChangeStep('allComplete');
    expect(component.steps.every((step) => step.status === 'success')).toEqual(
      true,
    );
  });

  it('ngOnChange value and status', () => {
    const changes: SimpleChanges = {
      stepWaiting: {
        currentValue: 'payment',
        previousValue: undefined,
        firstChange: false,
        isFirstChange: function (): boolean {
          throw new Error('Function not implemented.');
        },
      },
    };
    component.ngOnChanges(changes);
    expect(component.steps).toEqual([
      { step: 'cart', status: 'success', label: 'ตะกร้าสินค้า' },
      { step: 'payment', status: 'waiting', label: 'จ่ายเงิน' },
      { step: 'complete', status: 'default', label: 'เสร็จสิ้น' },
    ]);
  });
});
