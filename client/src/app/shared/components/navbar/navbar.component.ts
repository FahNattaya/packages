import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PathConstant } from '../../constant/path.constant';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() backUrl: string = '';
  @Input() titlePageName: string = '';
  @Input() isShowIconCart: boolean = true;
  @Input() isShowIconBack: boolean = true;
  cartTotal!: number;

  constructor(private router: Router, public cartService: CartService) {}

  gotoCartPage() {
    this.router.navigate([PathConstant.CART_PAGE]);
  }

  gotoHomePage() {
    window.location.href = PathConstant.SALE_PORTAL_PAGE;
  }

  backPage() {
    const isHomePage = this.backUrl === PathConstant.SALE_PORTAL_PAGE;
    if (isHomePage) {
      this.gotoHomePage();
    } else {
      this.router.navigate([this.backUrl]);
    }
  }

}
