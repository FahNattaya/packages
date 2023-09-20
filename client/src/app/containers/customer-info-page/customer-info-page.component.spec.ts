// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { CustomerInfoPageComponent } from './customer-info-page.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from 'src/app/store-ngrx/app.state';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { LocationService } from 'src/app/shared/service/location.service';

describe('CustomerInfoPageComponent', () => {
  let component: CustomerInfoPageComponent;
  let store: Store<AppState> = {
    select: jest.fn().mockImplementation(() => {
      return {
        pipe: jest.fn().mockImplementation(() => {
          return {
            subscribe: jest.fn().mockReturnValueOnce(of({})),
          };
        }),
      };
    }),
    dispatch: jest.fn().mockImplementation(() => {
      loadCustomerData: jest.fn();
    }),
  } as any;
  let router = {
    navigate: jest.fn(),
  } as unknown as Router;

  let locationService: LocationService = {
    getZipCode: jest.fn(),
  } as any;

  beforeEach(() => {
    router = {
      navigate: jest.fn(),
    } as unknown as Router;
    component = new CustomerInfoPageComponent(store, router, locationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to go service care page when customer is non-ais and have mobileNo', () => {
    store.select = jest.fn().mockReturnValueOnce(
      of({
        customerName: 'John Doe',
        mobileNo: '0901234567',
        idCardNo: '1111111111119',
        isMobileAis: false,
        customerAddress: {
          engFlag: 'English Flag',
          houseNo: '123',
          moo: 'Moo 5',
          mooban: 'Mooban Subdivision',
          building: 'Building A',
          floor: 'Floor 2',
          room: 'Room 203',
          soi: 'Soi 7',
          street: 'Downtown Street',
          amphur: 'Amphur City',
          tumbol: 'Tumbol District',
          province: 'Province County',
          zipCode: '12345',
        },
      })
    );

    component.ngOnInit();
    component.onClick();

    expect(router.navigate).toHaveBeenCalledWith([PathConstant.SERVICE_CARE]);
  });

  it('should to go list number page when customer is ais and do not have mobileNo', () => {
    store.select = jest.fn().mockReturnValueOnce(
      of({
        customerName: 'John Doe',
        mobileNo: '',
        idCardNo: '1111111111119',
        isMobileAis: true,
        customerAddress: {
          engFlag: 'English Flag',
          houseNo: '123',
          moo: 'Moo 5',
          mooban: 'Mooban Subdivision',
          building: 'Building A',
          floor: 'Floor 2',
          room: 'Room 203',
          soi: 'Soi 7',
          street: 'Downtown Street',
          amphur: 'Amphur City',
          tumbol: 'Tumbol District',
          province: 'Province County',
          zipCode: '12345',
        },
      })
    );

    component.ngOnInit();
    component.onClick();

    expect(router.navigate).toHaveBeenCalledWith([PathConstant.LIST_NUMBER]);
  });

  it('should to go moblie number page when customer is non-ais and do not have mobileNo', () => {
    store.select = jest.fn().mockReturnValueOnce(
      of({
        customerName: 'John Doe',
        mobileNo: '',
        idCardNo: '1111111111119',
        isMobileAis: false,
        customerAddress: {
          engFlag: 'English Flag',
          houseNo: '123',
          moo: 'Moo 5',
          mooban: 'Mooban Subdivision',
          building: 'Building A',
          floor: 'Floor 2',
          room: 'Room 203',
          soi: 'Soi 7',
          street: 'Downtown Street',
          amphur: 'Amphur City',
          tumbol: 'Tumbol District',
          province: 'Province County',
          zipCode: '12345',
        },
      })
    );

    component.ngOnInit();
    component.onClick();

    expect(router.navigate).toHaveBeenCalledWith([
      PathConstant.MOBILE_NUMBER_PAGE,
    ]);
  });
});
