import { TokenService } from './token.service';
import { CookieService } from 'ngx-cookie-service';

jest.mock('ngx-cookie-service');
jest.mock('jwt-decode');

describe('TokenService', () => {
  let tokenService: TokenService;
  let mockCookieService: jest.Mocked<CookieService>;

  beforeEach(() => {
    tokenService = new TokenService(mockCookieService);
  });

  it('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

});
