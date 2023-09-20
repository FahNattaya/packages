import { ProductPackageService } from './product-package.service';
import { SharedService } from './shared.service';

const httpMock = {
  post: jest.fn()
};

describe('ProductPackageService', () => {
  let service: ProductPackageService;

  beforeEach(() => {
    service = new ProductPackageService(httpMock as any, new SharedService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
