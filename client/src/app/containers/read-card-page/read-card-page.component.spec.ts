import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCardPageComponent } from './read-card-page.component';
import { ErrorService } from 'src/app/core/service/error.service';

describe('ReadCardPageComponent', () => {
  let component: ReadCardPageComponent;
  let fixture: ComponentFixture<ReadCardPageComponent>;

  beforeEach(async () => {
    // component = new ReadCardPageComponent(errorService);
    await TestBed.configureTestingModule({
      declarations: [ReadCardPageComponent],
      providers: [ErrorService],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
