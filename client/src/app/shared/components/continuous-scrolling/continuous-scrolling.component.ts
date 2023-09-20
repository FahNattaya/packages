import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-continuous-scrolling',
  templateUrl: './continuous-scrolling.component.html',
  styleUrls: ['./continuous-scrolling.component.scss'],
})
export class ContinuousScrollingComponent {
  @Input() isTwoRows?: boolean;
  @Input() isHiddenScrolling?: boolean;
  @Input() isShowScrollBar?: boolean = true;
}
