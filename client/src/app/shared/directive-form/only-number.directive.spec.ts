import { ElementRef, Renderer2 } from '@angular/core';
import { OnlyNumberDirective } from './only-number.directive';

describe('onlyNumberDirective', () => {
  let elementRef: ElementRef;
  let render: Renderer2;
  let directive: OnlyNumberDirective;

  beforeEach(() => {
    directive = new OnlyNumberDirective(elementRef, render);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
