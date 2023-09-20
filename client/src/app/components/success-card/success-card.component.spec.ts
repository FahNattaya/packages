import { SuccessCardComponent } from './success-card.component';


describe('SuccessCardComponent', () => {
  let component: SuccessCardComponent;

  const mockStore = {
    overrideSelector: jest.fn(),
    dispatch: jest.fn(),
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn() })),
  };

  beforeEach(async () => {
    component = new SuccessCardComponent(
      mockStore as any,
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
