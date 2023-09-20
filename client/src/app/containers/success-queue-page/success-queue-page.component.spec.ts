import { Router } from '@angular/router';
import { SuccessQueuePageComponent } from './success-queue-page.component';

describe('SuccessQueuePageComponent', () => {
  let component: SuccessQueuePageComponent;
  let mockRouter = {
    navigate: jest.fn(),
  } as unknown as Router;
  let mockStore: any = {
    dispatch: jest.fn(),
    select: jest.fn(),
  };
  beforeEach(() => {
    component = new SuccessQueuePageComponent(
      mockRouter,
      mockStore
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
