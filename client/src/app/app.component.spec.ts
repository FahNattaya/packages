import { AppComponent } from './app.component';
jest.mock('jwt-decode');

describe('AppComponent', () => {
  let component: AppComponent;
  let store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  };
  let session = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  let token = {
    getDataToken: jest.fn(),
  };
  beforeEach(async () => {
    component = new AppComponent(store as any, session as any, token as any);
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });
});
