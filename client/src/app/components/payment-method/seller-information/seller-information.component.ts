import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { TokenService } from 'src/app/core/service/token.service';
import { ISellerAll } from 'src/app/shared/model/seller.model';
import { LocationService } from 'src/app/shared/service/location.service';

@Component({
  selector: 'app-seller-information',
  templateUrl: './seller-information.component.html',
  styleUrls: ['./seller-information.component.scss'],
})
export class SellerInformationComponent implements OnInit{
  tokenData?: ISellerAll;
  sellerCodeFromToken?: string;
  locationName?: string;
  sellerForm: FormGroup;
  isHideButtonConfirm: boolean = false;
  
  constructor(
    private tokenService: TokenService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
  ) {

    this.sellerForm = this.formBuilder.group({
      sellerCode: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.tokenData = this.tokenService?.getDataToken();
    this.sellerCodeFromToken = this.tokenData?.pinCode
      ? parseInt(this.tokenData?.pinCode) + ''
      : this.tokenData?.ascCode;
    this.locationService
      ?.getLocationName(this.tokenData?.locationCode)
      .pipe(take(1))
      .subscribe((location) => {
        this.locationName = location.locationName;
      });

      this.sellerForm.get('sellerCode')?.setValue(this.sellerCodeFromToken);
  }

}
