import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IColorStock,
  IDataProductDetailPage,
  IProductStockRequest,
} from 'src/app/shared/model/product.model';
import {
  IColorDetail,
  IDetailProductSelected,
  IProductDetail,
} from '../../../shared/model/product.model';
import { SharedService } from '../../../shared/service/shared.service';
import { ISeller } from 'src/app/shared/model/seller.model';
import { ProductService } from 'src/app/shared/service/product.service';
@Component({
  selector: 'app-product-selling-detail',
  templateUrl: './product-selling-detail.component.html',
  styleUrls: ['./product-selling-detail.component.scss'],
})
export class ProductSellingDetailComponent implements OnInit, OnChanges {
  @Output() selectedDetail: EventEmitter<IDetailProductSelected> =
    new EventEmitter<IDetailProductSelected>();
  @Output() onOutOfStockOnHand: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() dataFromStore!: IDataProductDetailPage;

  productDetail?: IProductDetail;
  productColors: IColorDetail[] = [];
  imageActive: string = '';
  imageList: string[] = [''];
  colorActive: number = -1;
  stock: number = 1;
  isDisabledDecreaseStock: boolean = true;
  isEmptyImage: boolean = true;
  isStockError: boolean = false;
  userData?: ISeller;
  stockConfig?: { subStockCode: string; stockType: string };
  company: string = '';
  stockOnline: { [color: string]: number } = {};
  isScanImei = false;

  constructor(
    private sharedService: SharedService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.userData = this.dataFromStore.sellerData;
    this.stockConfig = this.dataFromStore.stockConfig;
    this.productDetail = this.dataFromStore.productDetail;
    this.onSetStock();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataFromStore'].currentValue) {
      this.productDetail = this.dataFromStore.productDetail;
      this.onSetStock();
      if (!this.productDetail!.hasOwnProperty('colorDefault')) {
        this.onSelectColor(0);
      } else {
        // this.productColors = this.productDetail!.colors || this.productDetail!.colorDefault;
        this.isScanImei = true;
        this.isEmptyImage = false;
        this.imageList = [this.productDetail!.imageDefault!];
        this.onSelectImage(this.productDetail!.imageDefault!);
        this.selectedDetail.emit({
          colorId: 0,
          company: this.company || 'AWN',
        });
      }
    }
  }

  subStockCodeDT: string = '';

  onSetStock() {
    if (!this.stockConfig?.subStockCode) {
      this.onOutOfStockOnHand.emit(false);
      this.productColors =
        this.productDetail!.colors || this.productDetail!.colorDefault;
      this.isStockError = false;
      return;
    }
    const reqStock: IProductStockRequest = {
      stockType: this.stockConfig?.stockType || '',
      locationCodeSource: this.userData?.locationCode || '',
      locationCodeDest: this.userData?.locationCode || '4289',
      productType: this.productDetail?.productType || '',
      productSubType: this.productDetail?.productSubtype || '',
      subStock: this.stockConfig?.subStockCode || '',
      brand: this.productDetail?.brand || '',
      model: this.productDetail?.model || '',
    };
    this.isStockError = Object.values(reqStock).includes('');
    if (!this.isStockError) {
      this.productService.getStockList(reqStock).subscribe({
        next: (response) => {
          const stockData =
            response.response.listData?.[0]?.productStock[0].colorStock;
          this.company =
            response.response.listData?.[0]?.productStock[0].company;
          if (stockData) {
            this.onOutOfStockOnHand.emit(false);
            this.productColors = this.productDetail!.colors.map((color) => {
              const stockAval =
                stockData
                  .find((stock) => stock.color === color.name)
                  ?.stockAval.toString() || '0';

              if (+stockAval !== 0 && this.colorActive === -1) {
                this.onSelectColor(color.colorId);
              }
              return {
                ...color,
                stock: stockAval,
              };
            });
          } else {
            this.onOutOfStockOnHand.emit(true);
            this.productColors = this.productDetail!.colors;
            this.onSelectColor(0);
            this.colorActive = -1;
          }
        },
        error: () => (this.isStockError = true),
      });
      this.getStockOnline(reqStock);
    }
  }

  getStockOnline(reqStock: IProductStockRequest) {
    if (this.userData?.outChnSalesCode === 'ASP') {
      reqStock.stockType = 'AIS';
    }
    this.productService
      .getStockList({
        ...reqStock,
        locationCodeDest: '4289',
        subStock: 'OLS',
      })
      .subscribe((response) => {
        const list = response.response.listData;
        let colorStock: IColorStock[] = [];
        if (list.length) {
          colorStock = list[0].productStock[0].colorStock;
        }
        this.productDetail?.colors.forEach((colorProduct) => {
          let aval =
            colorStock.find((color) => color.color == colorProduct.name)
              ?.stockAval || 0;
          this.stockOnline[colorProduct.name] = +aval;
        });
      });
  }

  onSetImageList(images: string[]): void {
    this.imageList = images;
  }

  onSelectImage(image: string): void {
    this.imageActive = image;
  }

  onSelectColor(colorId: number): void {
    this.colorActive = colorId;
    const newImageList = this.productDetail?.colors!.find(
      (color) => color.colorId === colorId
    )?.imageUrl!;
    const isEmptyImage = newImageList.length === 0;
    this.isEmptyImage = isEmptyImage;
    if (!isEmptyImage) {
      this.onSetImageList(newImageList);
      this.onSelectImage(newImageList?.[0]);
    }

    this.selectedDetail.emit({
      colorId: colorId,
      company: this.company || 'AWN',
    });
  }

  onIncrease(): void {
    this.stock++;
    this.isDisabledDecreaseStock = false;
  }

  onDecrease(): void {
    this.stock--;
    this.isDisabledDecreaseStock = this.stock === 1;
  }

  numberWithComma(value: string): string {
    return this.sharedService.numberWithComma(value);
  }
}
