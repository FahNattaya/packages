import { StockModelListComponent } from './stock-model-list.component';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/shared/service/product.service';
import { AppState } from 'src/app/store-ngrx/app.state';
import { SharedService } from 'src/app/shared/service/shared.service';
import { TokenService } from 'src/app/core/service/token.service';
import { of } from 'rxjs';

const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFTUE9UTzM5IiwidGltZXN0YW1wIjoiMjAyMzA4MzExMDEwIiwibG9jYXRpb25Db2RlIjoiOTc0MzkiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IuC4lOC4suC4o-C4suC4geC4suC4meC4leC5jCIsImxhc3RuYW1lIjoiLiIsInNoYXJlZFVzZXIiOiJBU1BPVE8zOSIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTUCIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IiIsInN1YiI6IlBBUlRORVJMREFQIiwicGluQ29kZSI6IiIsImF1dGhlbnRpY2F0aW9uIjoibmV3TG9naW4iLCJsb2NhdGlvbk9ubGluZSI6IiIsImZsYWdVc2VyVHlwZSI6IlNIQVJFIiwicm9sZUFjaW0iOiJBU1AiLCJvdXRQb3NpdGlvbiI6Ik1hbmFnZXIiLCJvdXRDaG5TYWxlcyI6IkFJUyBieSBQYXJ0bmVyIiwib3V0Q2huU2FsZXNDb2RlIjoiQVNQIiwib3UiOiJQQVJUTkVSIiwiaWF0IjoxNjkzNDUxNDAyLCJleHAiOjk5OTk5OTk5OTl9.Vr05CYMEo6zUnhpFjfIKwzKjlUN9mlSa2X4CsLM4PpY';
const sharedService = new SharedService();
const httpMock = {
  post: jest.fn(),
  get: jest.fn(),
};
const tokenService: TokenService = new TokenService({
  get: jest.fn().mockReturnValue(MOCK_TOKEN),
} as any);

describe('StockModelList Component', () => {
  let component: StockModelListComponent;
  const mockStore: Store<AppState> = {
    select: jest.fn(),
    dispatch: jest.fn(),
  } as any;
  const productService = new ProductService(
    httpMock as any,
    sharedService,
    { cancelPendingRequests: jest.fn() } as any,
    tokenService,
  );

  beforeEach(async () => {
    component = new StockModelListComponent(
      mockStore,
      productService,
      {} as any,
    );
  });

  it('should be created', () => {
    productService.getDataModelProduct = jest
      .fn()
      .mockReturnValueOnce(of([{ name: 'a' }, { name: 'b' }]));
    component.cancelRequest = jest.fn();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
