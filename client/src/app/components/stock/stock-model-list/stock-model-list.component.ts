import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveSelectModelProduct } from '../../../store-ngrx/actions/product.action';
import { AppState } from '../../../store-ngrx/app.state';
import { getLoading } from '../../../store-ngrx/selectors/product.selectors';
import { clearStockData } from '../../../store-ngrx/actions/stock.action';
import { HttpCancelService } from 'src/app/core/service/http-cancal.service';
import { IHandset } from 'src/app/shared/model/product.model';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-stock-model-list',
  templateUrl: './stock-model-list.component.html',
  styleUrls: ['./stock-model-list.component.scss'],
})
export class StockModelListComponent implements OnInit {
  allModel: IHandset[] = [];
  isEmptyModel: boolean = false;
  modelActive: number = 0;
  isLoading$ = this.store.select(getLoading);
  modelNameList: string[] = [];

  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private httpCancelService: HttpCancelService
  ) {}

  ngOnInit(): void {
    this.productService.getDataModelProduct().subscribe((models) => {
      if (models) {
        this.allModel = models;
        this.modelNameList = models?.map((model: any) => model.name) || [];
        this.selectModel(0);
      }
    });
  }

  selectModel(modelIndex: number) {
    this.cancelRequest();
    this.store.dispatch(clearStockData());
    this.modelActive = modelIndex;
    this.store.dispatch(
      saveSelectModelProduct({
        selectedAllModel: this.allModel[modelIndex],
      })
    );
  }

  cancelRequest() {
    this.httpCancelService.cancelPendingRequests();
  }
}
