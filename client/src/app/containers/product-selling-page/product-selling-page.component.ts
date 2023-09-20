import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Subject,
  Subscription,
  take,
  takeUntil,
} from 'rxjs';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { IDataPackageSelected } from 'src/app/shared/model/product-package.model';
import {
  ICheckStockRes,
  IDataProductDetailPage,
  IDetailProductSelected,
  IProductDetail,
} from 'src/app/shared/model/product.model';
import {
  ICampaignRequest,
  ICampaignResponseData,
  ITradePrice,
  ITradeRequest,
  ITradeResponse,
  ITrades,
} from 'src/app/shared/model/promotion.model';
import { ISeller } from 'src/app/shared/model/seller.model';
import { CartService } from 'src/app/shared/service/cart.service';
import { PromotionService } from 'src/app/shared/service/promotion.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { saveDataFromProductSelling } from 'src/app/store-ngrx/actions/cart.action';
import { selectedPackage } from 'src/app/store-ngrx/actions/product-package.action';
import { AppState } from 'src/app/store-ngrx/app.state';
import { ICustomerCriteria } from 'src/app/shared/model/mc-config.model';
import { getMergeDataProductSelling } from 'src/app/store-ngrx/selectors/shared.selector';
import { ErrorService } from 'src/app/core/service/error.service';
import { getSelectProduct } from 'src/app/store-ngrx/selectors/product.selectors';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';
import { Router } from '@angular/router';
import { messageConstant } from 'src/app/shared/constant/message.constant';

@Component({
  selector: 'app-product-selling-page',
  templateUrl: './product-selling-page.component.html',
  styleUrls: ['./product-selling-page.component.scss'],
})
export class ProductSellingPageComponent implements OnInit {
  customerConfigFlow: ICustomerCriteria[] = [];
  outChannelSalesConfig: any;
  customerCriteria?: ICustomerCriteria;
  backPageUrl = PathConstant.HANDSET_LIST_PAGE;
  campaignData?: ICampaignResponseData[];
  sellerData?: ISeller;
  loading: boolean = false;
  price!: ITradePrice;
  productDetail?: IProductDetail;
  textAddCartButton: string = 'ADD TO CART';
  textBuyNowButton: string = 'BUY NOW';
  trades: ITrades[] = [];
  isDisabledButton: boolean = false;
  isOutOfStockOnHand: boolean = true;
  isCheckSelectedCampaign: boolean = true;
  selectTrade!: number;
  selectedCriteria: string = '';
  selectedCampaign: number = 0;
  campaignDataSelected?: {
    name: string;
    icon: string;
    installmentFlag: boolean;
    customerCriteria: string;
  };
  selectedCompany: string = '';
  selectedColor: number = 0;
  stockRes?: ICheckStockRes;
  destroyed$: Subject<void> = new Subject();
  isDisabledCheckSelectPackage?: boolean;
  dataPackageSelected: IDataPackageSelected | undefined;
  returnCode: string = '';
  tradeIsSelected: boolean = false;
  tradeForPackage!: ITrades;
  discountPrice: number = 0;
  dataDetailPage!: IDataProductDetailPage;
  ngDestroy = new Subject<void>();
  @ViewChild('imeiModal') imeiModal?: ElementRef;
  resetImeiForm: boolean = false;
  imeiCode: string = '';
  imeiStore: string = '';
  imeiSubscription!: Subscription;
  flow: string = '';

  constructor(
    public cartService: CartService,
    private promotionService: PromotionService,
    private sharedService: SharedService,
    private errorService: ErrorService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.setSelectPackage();
    this.getDataFromStore();
    this.store.select(getOutChCustData).subscribe((config) => {
      if (config) {
        this.flow = config?.Flow;
      }
    });
  }

  async getDataFromStore() {
    this.store
      .select(getSelectProduct)
      .pipe(takeUntil(this.ngDestroy))
      .subscribe((data) => {
        this.productDetail = data;
        this.dataDetailPage = {
          ...this.dataDetailPage,
          productDetail: this.productDetail!,
        };
        this.imeiCode = this.productDetail?.imei?.code || '';
      });
    this.store
      .select(getMergeDataProductSelling)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data) {
            const seller: any = {
              ...data.sellerData,
              locatiomName: data.LocationName?.locationName,
            };
            this.sellerData = seller;
            // this.productDetail = data.productDetail;
            this.dataPackageSelected = data.selectPackage;
            this.isDisabledCheckSelectPackage = data.selectPackage
              ? data.selectPackage.isDisable
              : false;
            this.customerConfigFlow = data.configMc ? data.configMc : [];
            this.outChannelSalesConfig = data?.outChannelSales;
            const customerCriteria: ICustomerCriteria[] =
              this.customerConfigFlow.filter(
                (criteria: ICustomerCriteria) => criteria.statusEnable === 'Y'
              )!;
            this.dataDetailPage = {
              ...this.dataDetailPage,
              sellerData: this.sellerData!,
              stockConfig: {
                subStockCode: data.outChannelSales?.subStockCodeDT!,
                stockType: data.outChannelSales?.Flow!,
              },
            };
            this.onSelectCriteria(customerCriteria[0]);
          }
        },
      });
  }

  setSelectPackage() {
    this.dataPackageSelected = {
      title: '',
      detailTH: '',
      promotionCode: '',
      currentPackage: true,
      isDisable: false,
    };
    this.store.dispatch(
      selectedPackage({ dataSelectPackage: this.dataPackageSelected })
    );
  }

  onSetLoadData() {
    this.campaignData = undefined;
    this.campaignDataSelected = undefined;
    this.trades = [];
  }

  async onSelectDetail(detail: IDetailProductSelected) {
    this.selectedColor = detail.colorId;
    this.selectedCompany = detail.company;
    this.onSetLoadData();
    await this.getCampaign();
  }

  async onSelectCriteria(customerConfig: ICustomerCriteria) {
    this.selectedCriteria = customerConfig?.codeID;
    this.customerCriteria = customerConfig;
    this.isCheckSelectedCampaign = true;
    this.onSetLoadData();
    await this.getCampaign();
  }

  async getCampaign() {
    const campaignRequest: ICampaignRequest = {
      locationCode: this.sellerData?.locationCode || '',
      saleChannels: this.outChannelSalesConfig?.saleChannels,
      brand: this.productDetail?.brand || '',
      model: this.productDetail?.model || '',
      color: this.getColorName(),
      productType: this.productDetail?.productType || 'DEVICE',
      productSubtype: this.productDetail?.productSubtype || 'HANDSET',
      customerGroup: this.customerCriteria?.codeCPC || '',
      company: this.selectedCompany,
      offset: 1,
      max: 10,
      flow: this.flow,
    };
    if (this.selectedCompany) {
      this.promotionService
        .getCampaignPromotion(campaignRequest)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            const isCantFindData = res?.developerMessage === "Can't find Data";
            if (isCantFindData) {
              this.campaignData = [];
            } else {
              this.campaignData = res.data
                .filter((data) => {
                  if (this.customerCriteria?.excludeCampaign) {
                    return !this.customerCriteria?.excludeCampaign?.includes(
                      data.campaignId.toString()
                    );
                  }
                  if (this.customerCriteria?.includeCampaign) {
                    return this.customerCriteria?.includeCampaign?.includes(
                      data.campaignId.toString()
                    );
                  }
                  return true;
                })
                .map((campaign) => {
                  if (campaign.payments) {
                    const payments = campaign.payments
                      .filter((payment) => payment.method === 'CC')
                      .flatMap((payment) => payment.banks)
                      .flatMap((bank) => bank.installments);
                    const maxInstallmentTerms = Math.max(
                      ...payments.map(
                        (installment) => +installment.installmentTerms
                      )
                    );
                    const maxPayment = payments.find(
                      (installment) =>
                        +installment.installmentTerms === maxInstallmentTerms
                    );
                    campaign.maxInstallmentTerm = maxPayment?.installmentTerms;
                  }
                  return campaign;
                });
            }
          },
          error: () => {
            this.campaignData = [];
          },
        });
    } else {
      const isOutOfStock = this.selectedCompany === undefined;
      this.campaignData = isOutOfStock ? [] : undefined;
    }
  }

  getColorName(): string {
    return this.productDetail?.colorDefault
      ? this.productDetail?.colorDefault
      : this.productDetail?.colors!.find(
        (color) => color.colorId === this.selectedColor
      )?.name || '';
  }

  async onSelectCampaign(index: number) {
    this.selectedCampaign = index;
    const campaign: ICampaignResponseData = this.campaignData?.[index]!;
    this.campaignDataSelected = {
      name: campaign.campaignName,
      icon: campaign.icon,
      installmentFlag: campaign.installmentFlag,
      customerCriteria: this.customerCriteria?.flowNameTh || '',
    };
    await this.onGetTradePromotion();
    this.selectTrade = 0;
    this.isCheckSelectedCampaign = false;
    this.tradeIsSelected = true;
  }

  onSelectTrade(index: number) {
    this.selectTrade = index;
  }

  getDataTestID(textID: string): string {
    return textID.replace(/\s/g, '');
  }

  onOutOfStockOnHand(isOutOfStockOnHand: boolean) {
    this.isOutOfStockOnHand = isOutOfStockOnHand;
  }

  async onGetTradePromotion() {
    const tradeRequest: ITradeRequest = {
      locationCode: this.sellerData?.locationCode || '',
      saleChannels: this.outChannelSalesConfig?.saleChannels || [],
      brand: this.productDetail?.brand || '',
      model: this.productDetail?.model || '',
      color: this.getColorName(),
      productType: this.productDetail?.productType || 'DEVICE',
      productSubtype: this.productDetail?.productSubtype || 'HANDSET',
      customerGroup: this.customerCriteria?.codeCPC || '',
      company: this.selectedCompany,
      campaignId: this.campaignData?.[this.selectedCampaign].campaignId!,
    };
    this.promotionService
      .getTradePromotion(tradeRequest)
      .subscribe((dataRes: ITradeResponse) => {
        const isError = dataRes.resultCode !== '20000';

        this.isDisabledButton = isError;

        if (isError) {
          this.trades = [];
        } else {
          this.price = dataRes.data.prices?.find(
            (price) => price.priceGroup === 'EUP'
          )!;
          this.trades = this.formatTrades(dataRes).filter((data) => {
            if (this.customerCriteria?.excludeTrade) {
              return !this.customerCriteria?.excludeTrade?.includes(
                data.tradeNo
              );
            }
            if (this.customerCriteria?.includeTrade) {
              return !this.customerCriteria?.includeTrade?.includes(
                data.tradeNo
              );
            }
            return true;
          });
          this.selectTrade = 0;
        }
      });
  }

  formatTrades(dataRes: ITradeResponse): ITrades[] {
    const { trades } = dataRes.data;
    const formatData = trades
      ?.map((trade) => {
        let discountPrice = 0;
        let priceMap = this.sharedService.calculateDiscount(
          trade.discount,
          this.price.includeVat,
          this.price.excludeVat
        );
        this.price.includeVat = priceMap.priceInclude;
        discountPrice = this.sharedService.customRound(priceMap.discount);
        this.discountPrice = discountPrice;

        return {
          ...trade,
          discountPrice,
        };
      })
      .sort((a, b) => b.discountPrice - a.discountPrice);
    return formatData || [];
  }

  getSeclectedTrade(): ITrades {
    let trade: ITrades = this.trades[this.selectTrade];
    if (this.flow !== 'AIS') {
      trade.freegoods = [];
    }
    return trade;
  }

  saveProductSelected() {
    if (
      this.dataPackageSelected &&
      this.customerCriteria &&
      this.campaignData
    ) {
      const campaignSelected: ICampaignResponseData =
        this.campaignData?.[this.selectedCampaign];
      const tradeSelected: ITrades = this.getSeclectedTrade();
      const colorName = this.getColorName();

      this.store.dispatch(saveDataFromProductSelling({
        colorName: colorName,
        selectedColor: this.selectedColor,
        company: this.selectedCompany,
        campaignSelected: campaignSelected,
        tradeSelected: tradeSelected,
        tradePrice: this.price,
        customerCriteria: this.customerCriteria,
      }))

      this.router.navigate([PathConstant.VALIDATE_CUSTOMER_PAGE])
    } else {
      this.errorService.handleError({
        customMessage: messageConstant.ERROR
      });
    }
  }
  onScanImei(isOpenScanImei: boolean) {
    const modalElement = this.imeiModal?.nativeElement;
    if (isOpenScanImei) {
      if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
      }
    }
  }

  onSetImeiSubscription(imeiSubscription: Subscription) {
    this.imeiSubscription = imeiSubscription;
  }

  closeImeiModal() {
    const modalElement = this.imeiModal?.nativeElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
    this.resetImeiForm = !this.resetImeiForm;
    this.imeiSubscription.unsubscribe();
  }

  scanImeiSuccess(isPass: boolean) {
    if (isPass) {
      this.closeImeiModal();
      this.imeiCode = this.imeiStore;
    }
  }

  onConfirmImei(imei: any) {
    this.imeiStore = imei?.imeiNo;
  }

}