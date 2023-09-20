import { LocationService } from './location.service';
import { SharedService } from './shared.service';

describe('LocationService', () => {
  let service: LocationService;
  let mockHttp = {
    get: jest.fn(),
  };
  let svc: SharedService;

  beforeEach(() => {
    service = new LocationService(mockHttp as any, svc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
