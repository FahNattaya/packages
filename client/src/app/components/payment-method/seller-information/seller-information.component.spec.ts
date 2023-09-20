import { FormBuilder } from '@angular/forms';
import { SellerInformationComponent } from './seller-information.component';
import { TokenService } from 'src/app/core/service/token.service';
import { LocationService } from 'src/app/shared/service/location.service';

describe('SellerInformationComponent', () => {
  let component: SellerInformationComponent;
  let tokenService: TokenService;
  let locationService: LocationService;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    component = new SellerInformationComponent(tokenService, locationService,formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
