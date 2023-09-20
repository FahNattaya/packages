import { StockFilterLocationComponent } from './stock-filter-location.component';
import { Store } from '@ngrx/store';
import { loadLocationData } from '../../../store-ngrx/actions/location.action';

describe('FilterLocationComponent', () => {
  let component: StockFilterLocationComponent;
  let store: Store<any> = {
    select: jest
      .fn()
      .mockImplementation(() => ({
        subscribe: jest
          .fn()
          .mockImplementation(() => ({ unsubscribe: jest.fn() })),
      })),
    dispatch: jest.fn(),
  } as any;

  beforeEach(async () => {
    component = new StockFilterLocationComponent(store);
  });

  it('location should saved when filter checkbox selected correctly', () => {
    component.saveData(true, 'location1');
    expect(component.locationCodeDest).toEqual(['location1']);

    component.saveData(true, 'location2');
    expect(component.locationCodeDest).toEqual(['location1', 'location2']);

    component.saveData(false, 'location1');
    expect(component.locationCodeDest).toEqual(['location2']);
  });

  it('search button status should change correctly by filter checkbox status', () => {
    const locationCode: string = '1100';
    const mockUpCheckboxStatus1: boolean[] = [false, true, false];
    const mockUpCheckboxStatus2: boolean[] = [false, false, false];
    component.selectedCheckboxes = mockUpCheckboxStatus1;
    component.saveData(true, locationCode);
    expect(component.isDisabled).toEqual(false);

    component.selectedCheckboxes = mockUpCheckboxStatus2;
    component.saveData(false, locationCode);
    expect(component.isDisabled).toEqual(true);
  });

  it('the store should dispatch after select tab correctly', () => {
    const filterType = 'Amphur';
    const locationCode = '1100';
    const locationType = 'AIS';
    const onSelectTabSpy = jest.spyOn(component, 'selectedTab');
    const onStoreSpy = jest.spyOn(store, 'dispatch');

    component.selectedTab(filterType);
    expect(onSelectTabSpy).toHaveBeenCalled();
    expect(onSelectTabSpy).toHaveBeenCalledWith(filterType);
    expect(onStoreSpy).toHaveBeenCalled();
    expect(onStoreSpy).toHaveBeenCalledWith(
      loadLocationData({
        filterType: filterType,
        locationCode: locationCode,
        locationType: locationType,
      }),
    );
  });

  it('the selectedBrand should call subscribe after search', () => {
    const onSearchSpy = jest.spyOn(component, 'onSearch');
    const onSubscribeSpy = jest.spyOn(component.selectedBrand$, 'subscribe');

    component.onSearch();
    expect(onSearchSpy).toHaveBeenCalled();
    expect(onSubscribeSpy).toHaveBeenCalled();
  });

  it('data should dispatched correctly', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadLocationData({
        filterType: 'TUMBOL_TH',
        locationCode: '1100',
        locationType: 'AIS',
      }),
    );
  });
});
