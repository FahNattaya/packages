import { of } from 'rxjs';
import { MenuBarComponent } from './menu-bar.component';

describe('MenuBarComponent', () => {
  let mockStore: any;
  let component: MenuBarComponent;

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of({})),
    };

    component = new MenuBarComponent(mockStore);
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('Input value should create', () => {
    expect(component.isShowSearch).toBe(true);
    expect(component.isShowCategory).toBe(true);
    expect(component.isShowFilter).toBe(true);
    expect(component.isShowLocation).toBe(false);
    expect(component.typeInputSearch).toBe('search');
    expect(component.locationName).toBe('');
  });

  it('emit true when scan imei', () => {
    component.imei.emit = jest.fn();
    component.onScanImei();
    expect(component.imei.emit).toHaveBeenCalled();
  });

  test('on Enter', () => {
    component.onEnter({ key: 'Enter' } as any);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  test('on Clear Search input', () => {
    component.searchValue.reset = jest.fn();
    component.clearSearchInput();
    expect(component.searchValue.reset).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
