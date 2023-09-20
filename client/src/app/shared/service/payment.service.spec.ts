import { PaymentService } from './payment.service';
import { SharedService } from './shared.service';

describe('LocationService', () => {
  let service: PaymentService;
  let mockHttp = {
    get: jest.fn(),
  };
  let svc: SharedService

  beforeEach(() => {
    service = new PaymentService(
      mockHttp as any,
      svc
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
