import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { LocationService } from 'src/app/shared/service/location.service';
import { saveOtherAddress } from 'src/app/store-ngrx/actions/customer.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getState } from 'src/app/store-ngrx/selectors/customer.selectors';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';

@Component({
  selector: 'app-receipt-address-form',
  templateUrl: './receipt-address-form.component.html',
  styleUrls: ['./receipt-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiptAddressFormComponent implements OnInit {
  public address = [];
  public province = [];
  public amphur: any;
  public tumbol: any;
  shopType: string | undefined = 'AIS';
  destroyed$: Subject<void> = new Subject();
  aisShopForm!: FormGroup;
  partnerForm!: FormGroup;
  zipCode = [];
  confirmButtonText = 'CONFIRM';
  selectedProvince: string = '';
  selectedAmphur: string = '';
  selectedTumbol: string = '';
  zipCodeByTumbol: any;
  submitted = false;
  @ViewChild(FormGroupDirective) myForm: any;
  @ViewChild('canvas') formCanvas!: ElementRef;
  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.onBuilderFormAISShop();
    this.partnerForm = this.formBuilder.group({
      partnerCustomerName: ['', Validators.required],
      partnerEmail: ['', [Validators.required, this.emailOrHyphenValidator()]],
      partnerMobileNo: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onBuilderFormAISShop() {
    this.aisShopForm = this.formBuilder.group({
      idCard: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      customerName: ['', Validators.required],
      homeNo: ['', Validators.required],
      moo: [''],
      mooBan: [''],
      room: [''],
      floor: [''],
      buildingName: [''],
      soi: [''],
      street: [''],
      province: ['', Validators.required],
      amphur: ['', Validators.required],
      tumbol: ['', Validators.required],
      zipCode: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailOrHyphenValidator()]],
      otherMobileNo: [''],
    });
  }

  ngOnInit() {
    this.locationService.getProvinces().subscribe((county: any) => {
      this.province = county.provinces.sort((a: any, b: any) =>
        a.PROVINCE_NAME.localeCompare(b.PROVINCE_NAME)
      );
      this.zipCode = county.zipCodes;
    });
    this.store
      .select(getOutChCustData)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((config) => {
        this.shopType = config?.Flow;
      });
  }

  ngAfterViewInit(): void {
    (this.formCanvas.nativeElement as HTMLElement).addEventListener(
      'shown.bs.offcanvas',
      this.onEditForm.bind(this),
      { once: true }
    );
  }

  onEditForm() {
    this.store
      .select(getState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data) => {
          if (data.otherAddress) {
            if (this.shopType === 'AIS') {
              this.aisShopForm.patchValue({
                idCard: data.otherAddress?.idCard,
                customerName: data.otherAddress?.customerName,
                homeNo: data.otherAddress?.homeNo,
                moo: data.otherAddress?.moo,
                mooBan: data.otherAddress?.mooBan,
                room: data.otherAddress?.room,
                floor: data.otherAddress?.floor,
                buildingName: data.otherAddress?.buildingName,
                soi: data.otherAddress?.soi,
                street: data.otherAddress?.street,
                province: data.otherAddress?.province,
                amphur: data.otherAddress?.amphur,
                tumbol: data.otherAddress?.tumbol,
                zipCode: data.otherAddress?.zipCode,
                email: data.otherAddress?.email,
                otherMobileNo: data.otherAddress?.otherMobileNo,
              });
            } else {
              this.partnerForm.patchValue({
                partnerCustomerName: data.otherAddress?.name,
                partnerEmail: data.otherAddress?.email,
                partnerMobileNo: data.otherAddress?.mobileNo,
              });
            }
          } else {
            if (this.shopType === 'AIS') {
              this.onBuilderFormAISShop();
            } else {
              this.partnerForm.reset();
            }
          }
        },
      });
  }

  onSelectProvice(item: any) {
    const filters = { PROVINCE_ID: [item.PROVINCE_ID] };
    this.address = this.multiFilter(this.zipCode, filters);
    this.amphur = this.mapCities(this.address);
    this.selectedProvince = item.PROVINCE_NAME;
  }

  onSelectedAmphur(item: any) {
    this.selectedAmphur = item.CITY;
    this.tumbol = [...this.address].filter(
      (address: any) => address.CITY === item.CITY
    );
  }

  onSelectedTumbol(item: any) {
    this.selectedTumbol = item.TUMBOL;
    const filters = { TUMBOL: [item.TUMBOL], CITY: [item.CITY] };
    const data = this.multiFilter(this.zipCode, filters)[0];
    this.zipCodeByTumbol = data.ZIPCODE;
  }

  multiFilter(array: any, filters: any) {
    return array.filter((o: any) =>
      Object.keys(filters).every((key) =>
        [].concat(filters[key]).some((value) => o[key].includes(value))
      )
    );
  }

  mapCities(addressData: any) {
    const mappedCities: { [city: string]: any } = {};
    for (let i = 0, len = addressData.length; i < len; i++) {
      mappedCities[addressData[i]['CITY']] = addressData[i];
    }
    addressData = [];
    for (const city in mappedCities) {
      addressData.push(mappedCities[city]);
    }
    return addressData;
  }

  onSubmit() {
    this.submitted = true;
    const checkedForm =
      this.shopType === 'PARTNER' ? this.partnerForm : this.aisShopForm;
    if (checkedForm.invalid || checkedForm.status === 'INVALID') return;
    this.store.dispatch(
      saveOtherAddress({ otherAddress: this.getFilledOtherAddress() })
    );
    this.closeForm();
  }

  getFilledOtherAddress() {
    let selectedForm = this.aisShopForm;
    let otherAddress: any = {};
    if (this.shopType === 'PARTNER') {
      selectedForm = this.partnerForm;
      otherAddress['email'] = selectedForm.get('partnerEmail')?.value;
      otherAddress['name'] = selectedForm.get('partnerCustomerName')?.value;
      otherAddress['mobileNo'] = selectedForm.get('partnerMobileNo')?.value;
    }
    otherAddress = {
      ...otherAddress,
      idCard: selectedForm.get('idCard')?.value ?? '',
      customerName: selectedForm.get('customerName')?.value ?? '',
      homeNo: selectedForm.get('homeNo')?.value ?? '',
      moo: selectedForm.get('moo')?.value ?? '',
      mooBan: selectedForm.get('mooBan')?.value ?? '',
      room: selectedForm.get('room')?.value ?? '',
      floor: selectedForm.get('floor')?.value ?? '',
      buildingName: selectedForm.get('buildingName')?.value ?? '',
      soi: selectedForm.get('soi')?.value ?? '',
      street: selectedForm.get('street')?.value ?? '',
      amphur: this.selectedAmphur ?? '',
      tumbol: this.selectedTumbol ?? '',
      province: this.selectedProvince ?? '',
      zipCode: selectedForm.get('zipCode')?.value ?? '',
      email:
        selectedForm.get('email')?.value ||
        this.partnerForm.get('partnerEmail')?.value ||
        '',
      otherMobileNo: selectedForm.get('otherMobileNo')?.value ?? '',
    };
    return otherAddress;
  }

  closeForm() {
    this.submitted = false;
    this.zipCodeByTumbol = '';
    this.myForm.resetForm();
    document.getElementById('closeButton')?.click();
  }

  get formControl(): { [key: string]: AbstractControl } {
    if (this.shopType === 'PARTNER') {
      return this.partnerForm.controls;
    }
    return this.aisShopForm.controls;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  emailOrHyphenValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value === '-' || Validators.email(control) === null) {
        return null;
      }

      return { invalidEmailOrHyphen: true };
    };
  }
}
