import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousScrollingComponent } from './continuous-scrolling.component';

describe('ContinuousScrollingComponent', () => {
  let component: ContinuousScrollingComponent;
  let fixture: ComponentFixture<ContinuousScrollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContinuousScrollingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContinuousScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
