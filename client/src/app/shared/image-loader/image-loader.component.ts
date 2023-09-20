import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent {
  isLoaded = false;
  @Input()
  src!: string;
  @Input() imageClass: string = ''

  onImageLoad() {
    this.isLoaded = true;
  }
}
