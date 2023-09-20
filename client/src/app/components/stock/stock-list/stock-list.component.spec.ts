import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StockListComponent } from './stock-list.component';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [StockListComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
  });


  it('should initialize myData$ with the correct value from the store', () => {
    const mockData = {
      dataStock: [
        {
          locationCode: '1100',
          locationName: 'สาขาอาคารเอไอเอส 2',
          productStock: [
            {
              productName: 'APPLE IPHONE864',
              totalStockAval: 145,
              colorStock: [
                {
                  color: 'GOLD',
                  stockAval: 80,
                },
                {
                  color: 'SILVER',
                  stockAval: 51,
                },
                {
                  color: 'SPACE GREY',
                  stockAval: 14,
                },
              ],
            },
          ],
        },
      ],
    };

    component.stockData$.subscribe((data) => {
      expect(data).toEqual(mockData);
    });
  });

});
