import { Component } from '@angular/core';
import * as moment from 'moment';
import { ErrorService } from 'src/app/core/service/error.service';
import { PathConstant } from 'src/app/shared/constant/path.constant';
declare let window: any;
declare let $: any;

@Component({
  selector: 'app-read-card-page',
  templateUrl: './read-card-page.component.html',
  styleUrls: ['./read-card-page.component.scss'],
})
export class ReadCardPageComponent {
  returnDataObj: any;
  returnDataObj2: any;
  progressTimer: number = 1000;
  progress: number | undefined;
  message = '';
  finishProgress: boolean | undefined;
  timerID: any;
  profilePhoto: any;
  showProgress: boolean | undefined;
  backPageUrl = PathConstant.VALIDATE_CUSTOMER_PAGE;
  constructor(private errorService: ErrorService) {}
  ngOnInit() {
    this.timerID = setInterval(() => {}, this.progressTimer); //Timer
    this.onPostMessageIOS('readIDCard', 'start');
    this.iosCallBack();
  }
  onPostMessageIOS(req: any, param: any) {
    try {
      window.webkit?.messageHandlers.aisNative.postMessage({
        request: req,
        parameter: param,
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  iosCallBack(): void {
    let finish: number = 100;
    // let second: number = 10;
    window.aisNativeCallback = (data: any) => {
      let resp = JSON.parse(data);
      if (resp.request === 'readIDCard') {
        if (resp.response.message === 'onLoadProgress') {
          this.message = 'onLoadProgress';
          this.progress = parseInt(resp.response.data);
          if (this.progress <= finish) {
          }
        } else if (resp.response.message === 'onLoadCompleted') {
          if (resp.response.hasOwnProperty('image')) {
            if (
              typeof resp.response.image === 'string' &&
              resp.response.image.includes('data:image')
            ) {
              this.message = 'onLoadCompleted';
              console.log('onLoadCompleted');
              let photoResponse = resp.response.image;
              this.finishProgress = true;
              let result: any = resp.response.data;
              this.onGetPhotoIOS(photoResponse);
              this.mappingCardDataIOS(result);
              return;
            }
          }
        } else if (resp.response.message === 'onError') {
          this.message = 'onError';
          console.log('onError');
          this.finishProgress = false;
          this.showProgress = false;
          this.errorService.handleError({
            customMessage:
              'ไม่สามารถอ่านบัตรประชาชนได้ กรุณากรอกเลขที่บัตรประชาชน',
          });
        } else if (
          resp.response.message === 'onCardStatusChanged' &&
          resp.response.data == 'presented'
        ) {
          this.message = 'onCardStatusChanged';
          console.log('onCardStatusChanged');
          this.progress = 0;
          $('.custom').css('width', 0);
          this.finishProgress = false;
          this.showProgress = true;
        } else if (
          resp.response.message === 'onCardStatusChanged' &&
          resp.response.data == 'empty'
        ) {
          this.message = 'onCardStatusChanged empty';
          console.log('onCardStatusChanged empty');
          if (this.progress === 100) {
            this.finishProgress = true;
            this.showProgress = true;
          } else {
            this.finishProgress = false;
            this.showProgress = false;
            $('.custom').css('width', 0);
          }
        }
      }
    };
  }
  onGetPhotoIOS(image: any): void {
    console.log('onGetPhotoIOS');
    this.profilePhoto = image;
    setTimeout(function () {
      $('#imgRegNumVerifyScanIdProfilePhoto').attr('src', image);
    }, 1000);
  }

  mappingCardDataIOS(textProfile: any): void {
    this.returnDataObj = JSON.stringify(textProfile);
    const birth = this.extractBirthDateIdCardPc(textProfile.birthdate);
    const province = this.defaultIfEmpty(textProfile.province).replace(
      /(^จังหวัด)/,
      ''
    );
    const issueDate = textProfile.issueDate;
    const expire = this.extractExpireDateIdCardPc(textProfile.expireDate);

    const customerdata = {
      idCardNo: this.defaultIfEmpty(textProfile.nationalID),
      imageReadSmartCard:
        this.profilePhoto && this.profilePhoto.length > 0
          ? this.profilePhoto
          : '',
      idCardType: 'บัตรประชาชน',
      titleName: this.defaultIfEmpty(textProfile.thaiTitleName),
      firstName: this.defaultIfEmpty(textProfile.thaiFirstName),
      lastName: this.defaultIfEmpty(textProfile.thaiLastName),
      firstNameEn: this.defaultIfEmpty(textProfile.englishFirstName),
      lastNameEn: this.defaultIfEmpty(textProfile.englishLastName),
      birthdate: `${birth.day}/${birth.month}/${birth.year}`,
      gender: this.defaultIfEmpty(textProfile.sex) === '1' ? 'M' : 'F',
      address: {
        homeNo: this.defaultIfEmpty(textProfile.address),
        moo: this.defaultIfEmpty(textProfile.moo).replace(/^หมู่ที่/, ''),
        street: this.defaultIfEmpty(textProfile.thanon).replace(/^ถนน/, ''),
        soi: this.defaultIfEmpty(textProfile.soi).replace(/^ซอย/, ''),
        tumbol: this.defaultIfEmpty(textProfile.tumbol).replace(
          /^(ตำบล|แขวง)/,
          ''
        ),
        amphur: this.defaultIfEmpty(textProfile.amphur).replace(
          /^(อำเภอ|เขต)/,
          ''
        ),
        province: province === 'กรุงเทพมหานคร' ? 'กรุงเทพ' : province,
      },
      issueDate:
        issueDate.substring(6, 8) +
        '/' +
        issueDate.substring(4, 6) +
        '/' +
        issueDate.substring(0, 4),
      expireDate: `${expire.day}/${expire.month}/${expire.year}`,
    };
    this.returnDataObj2 = JSON.stringify(customerdata);
  }

  defaultIfEmpty(text: any): any {
    return (text || '').trim();
  }

  extractBirthDateIdCardPc(date: string = '00000000') {
    // YYYYMMDD
    let year;
    let month;
    let day;
    try {
      year = moment(date.substring(0, 4), 'YYYY');
      if (year.isValid()) {
        year = year.format('YYYY');
      } else {
        year = '0000';
      }
    } catch (error) {
      year = '0000';
    }
    try {
      month = moment(date.substring(4, 6) + year, 'MMYYYY');
      if (month.isValid()) {
        month = month.format('MM');
      } else {
        month = '01';
      }
    } catch (error) {
      month = '01';
    }
    try {
      day = moment(date.substring(6, 8) + month + year, 'DDMMYYYY');
      if (day.isValid()) {
        day = day.format('DD');
      } else {
        day = '01';
      }
    } catch (error) {
      day = '01';
    }
    return { year, month, day };
  }

  extractExpireDateIdCardPc(date: string = '99999999') {
    // YYYYMMDD
    let year;
    let month;
    let day;
    try {
      year = moment(date.substring(0, 4), 'YYYY');
      if (year.isValid()) {
        year = year.format('YYYY');
      } else {
        year = '9999';
      }
    } catch (error) {
      year = '9999';
    }
    try {
      month = moment(date.substring(4, 6) + year, 'MMYYYY');
      if (month.isValid()) {
        month = month.format('MM');
      } else {
        month = '01';
      }
    } catch (error) {
      month = '01';
    }
    try {
      day = moment(date.substring(6, 8) + month + year, 'DDMMYYYY');
      if (day.isValid()) {
        day = day.format('DD');
      } else {
        day = '01';
      }
    } catch (error) {
      day = '01';
    }
    return { year, month, day };
  }
}
