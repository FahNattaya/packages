import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { messageConstant } from 'src/app/shared/constant/message.constant';
import { EDocumentService } from 'src/app/shared/service/e-document.service';
import { AppState } from '../../store-ngrx/app.state';
import { Store } from '@ngrx/store';
import { ICustomerData } from 'src/app/shared/model/customer.model';
import {
  IProductDetail,
  IPromotionsSelected,
} from 'src/app/shared/model/product.model';
import { IMobileCareSelected } from 'src/app/shared/model/service-care.model';
import {
  IContactRequest,
  IContactResponse,
  IGetCondition,
} from 'src/app/shared/model/e-document.model';
import { SweetAlert } from 'src/app/shared/alert/sweet-alert';
import { SafeResourceUrl } from '@angular/platform-browser';
import { McConfigService } from 'src/app/shared/service/mc-config.service';
import { ILocationName } from 'src/app/shared/model/location.model'
import {
  loadContractImage,
} from 'src/app/store-ngrx/actions/e-document.action';
import { getCartList } from 'src/app/store-ngrx/selectors/cart.selectors';
import { LocationService } from 'src/app/shared/service/location.service';
import { ICartMc } from 'src/app/shared/model/cart.model';

@Component({
  selector: 'app-capture-id-card-page',
  templateUrl: './capture-id-card-page.component.html',
  styleUrls: ['./capture-id-card-page.component.scss'],
})
export class CaptureIdCardPageComponent implements OnDestroy {
  backPageUrl = PathConstant.PAYMENT_METHOD;
  textBackButton: string = 'BACK';
  textNextButton: string = 'NEXT';
  image: string = '';
  alert: SweetAlert = new SweetAlert();
  contractRequest?: IContactRequest;
  contractData?: IContactResponse;
  contractImage: SafeResourceUrl | undefined;
  isLoading = false;

  customer?: ICustomerData;
  productDetail?: IProductDetail;
  promotion?: IPromotionsSelected;
  locationName?: ILocationName;
  mobileCareData?: IMobileCareSelected;
  mobileCare?: string;
  condition?: string;
  companyProduct?: string;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private locationService: LocationService,
    private eDocumentService: EDocumentService,
    private McConfigService: McConfigService
  ) { }

  getImageCapture(image: string) {
    this.image = image;
  }

  async getAllDataForContract(res: any): Promise<IContactRequest> {
    const locationName: string = await this.getLocationName(res.seller.locationCode);
    const condition: string = await this.getConditionText({
      conditionCode: res.campaign.conditionCode,
      location: res.seller.locationCode
    });
    const companyProduct: string = await this.getCompanyProductNameTH(res.device.company);
    
    const request = {
      campaignName: res.campaign.campaignName,
      locationName: locationName,
      idCard: this.formatIdCard(res.customer.idCardNo),
      titleName: res.customer.titleName,
      fullName: res.customer.firstName + ' ' + res.customer.lastName,
      mobileNumber: res.customer.mainMobile,
      brand: res.device.brand,
      model: res.device.model,
      color: res.device.colorName,
      priceIncludeVat: res.campaign.priceIncludeVat,
      discountIncludeVat: res.campaign.discountIncludeVat,
      netPrice: res.campaign.netPrice,
      contract: res.campaign.contract || 0,
      advancePay: res.campaign.advancePay,
      mobileCarePackageTitle: res.package.title,
      condition: condition,
      companyProduct: companyProduct,
      idCardType: res.customer.idCardType,
      summaryPrice: res.summaryPrice
    };
    return request;
  }
  async getLocationName(locationCode: string): Promise<string> {
    return (await firstValueFrom(this.locationService.getLocationName(locationCode))).locationName
  }

  async getConditionText(getCondition: IGetCondition): Promise<string> {
    return (await firstValueFrom(this.eDocumentService.getCondition(getCondition))).data.conditionText
  }

  async getCompanyProductNameTH(company: string): Promise<string> {
    return (await firstValueFrom(this.McConfigService.getCompanyName(company))).NAME_TH
  }

  async getContractRequest(): Promise<void> {
    this.isLoading = true;
    const cart: ICartMc[] = await firstValueFrom(this.store.select(getCartList))
    const contractDataRequest: IContactRequest = await this.getAllDataForContract(cart[0]);
    await this.store.dispatch(
      loadContractImage({ contractRequest: contractDataRequest })
    );
  }

  async onNext() {
    this.getContractRequest()
    .catch(() => {
      this.alert.swalError(messageConstant.ERROR);
    })
    .finally(() => {
      this.isLoading = false;
      this.router.navigate([PathConstant.CONTRACT_PAGE]);
    })
  }

  formatIdCard(idCard: string): string {
    return 'xxxxxxxxx' + idCard.slice(-4);
  }

  onBack() {
    this.router.navigate([PathConstant.PAYMENT_METHOD]);
  }

  ngOnDestroy(): void {
    this.isLoading = false;
  }
}
