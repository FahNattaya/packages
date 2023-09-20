import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-next',
  templateUrl: './button-next.component.html',
  styleUrls: ['./button-next.component.scss'],
})
export class ButtonNextComponent {
  @Input() textButton: string = 'NEXT';
  @Input() isPrimary: boolean = true;

  buttonColor() {
    if (this.isPrimary) {
      return 'var(--mc-primary-color)';
    }
    return 'var(--mc-text-secondary-color)';
  }

  changeFormat(textButton: string) {
    const str = textButton.toLowerCase();
    const textIDArray = str.split(' ');
    let textID = '';
    for (let i = 0; i < textIDArray.length; i++) {
      textIDArray[i] =
        textIDArray[i].charAt(0).toUpperCase() + textIDArray[i].substring(1);
      textID = textID + textIDArray[i];
    }
    return textID;
  }

  ID(textButton: string) {
    return 'button' + this.changeFormat(textButton) + 'ID';
  }

  dataTestID(textButton: string) {
    return 'button' + this.changeFormat(textButton);
  }
}
