import { Component } from '@angular/core';
import { AppState } from './store-ngrx/app.state';
import { Store } from '@ngrx/store';
import { loadDataCustomerSuccess } from './store-ngrx/actions/customer.action';
import * as moment from 'moment';
import 'moment-timezone';
import { SessionStorageService } from './core/service/session-storage.service';
import { TokenService } from './core/service/token.service';
import { loadLocationName } from './store-ngrx/actions/location.action';
import { saveUser } from './store-ngrx/actions/seller.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  constructor(
    private store: Store<AppState>,
    private sessionStorageService: SessionStorageService,
    private tokenService: TokenService
  ) {
    this.store.dispatch(
      loadLocationName({
        locationCode: this.tokenService.getDataToken()?.locationCode || '',
      })
    );
    this.store.dispatch(
      saveUser({ userData: this.tokenService.getDataToken() })
    );
    moment.tz.setDefault('Asia/Bangkok');
    const storedState = this.sessionStorageService.getItem('appState');
    if (storedState) {
      const { customerData } = storedState;
      this.store.dispatch(loadDataCustomerSuccess(customerData));
    }

    this.store.subscribe((state) => {
      const { product, customer } = state;
      this.sessionStorageService.setItem('appState', { product, customer });
    });
  }
}
