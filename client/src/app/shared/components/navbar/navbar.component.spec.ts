import { CartService } from '../../service/cart.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let router = { navigate: jest.fn() };
  let component: NavbarComponent;
  let mockCartListService: CartService;

  Object.defineProperty(window, 'location', {
    value: {
      href: '',
    },
  });

  beforeEach(() => {
    component = new NavbarComponent(router as any, mockCartListService as any);
    router.navigate.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to backURL', () => {
    component.backUrl = '/';
    component.backPage();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('backURL is home page should go to home page', () => {
    component.backUrl = '/newlogin/landing';
    component.backPage();
    expect(window.location.href).toBe('/newlogin/landing');
  });

  it('should navigate to the cart page when button cart', () => {
    component.gotoCartPage();
    expect(router.navigate).toHaveBeenCalledWith(['/cart']);
  });

  it('should navigate to the homepage when button home', () => {
    component.gotoHomePage();
    expect(window.location.href).toBe('/newlogin/landing');
  });
});
