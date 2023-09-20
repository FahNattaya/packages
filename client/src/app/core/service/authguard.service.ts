import { Injectable } from '@angular/core';
import { ISeller } from '../../shared/model/seller.model';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
/* check for accessToken
    stored in cookie key -- accessToken
    login from /newlogin
*/
@Injectable()
export class AuthGuard {
  constructor(private router: Router, private tokenService: TokenService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin();
  }

  userData?: ISeller;

  getOutChnSalesCode() {
    const outChnSalesCode = 'AISSHOP';
    return outChnSalesCode;
  }

  async checkLogin(): Promise<boolean> {
    if (await this.tokenService?.getDataToken()) {
      return true;
    }
    this.router.navigate(['/newlogin/callback-signin']);
    return false;
  }
}
