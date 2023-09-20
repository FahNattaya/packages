import { AuthGuard } from './authguard.service';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNISVJBUEhSIiwidGltZXN0YW1wIjoiMjAyMzA3MjUxNzI0IiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiY2hpcmFwaHJAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoiY2hpcmFwaGFuIiwibGFzdG5hbWUiOiJyYXdhbmd3b25nIiwic2hhcmVkVXNlciI6IiIsInVzZXJUeXBlIjoiQUlTIiwicm9sZSI6IkFJUyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IjA4OTUwMDQ1MzciLCJzdWIiOiJFTVBMT1lFRUxEQVAiLCJwaW5Db2RlIjoiMDAwMjM0NDAiLCJhdXRoZW50aWNhdGlvbiI6Im5ld0xvZ2luIiwibG9jYXRpb25PbmxpbmUiOiIiLCJmbGFnVXNlclR5cGUiOiJJTkRJVklEVUFMIiwicm9sZUFjaW0iOiJBSVNTSE9QIiwib3V0UG9zaXRpb24iOiJPZmZpY2VyIiwib3V0Q2huU2FsZXMiOiJBSVMgU2hvcCIsIm91dENoblNhbGVzQ29kZSI6IkFJU1NIT1AiLCJvdSI6IkVNUExPWUVFIiwiaWF0IjoxNjkwMjgwNjgzLCJleHAiOjk5OTk5OTk5OTl9.urWOyZmp4GjeOUN_aM_FiPiWf1vqs5FRzdtXTB6msvs';

describe('Auth Guard Service', () => {
  let auth: AuthGuard;
  const cookie = {
    set: jest.fn(),
    get: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };
  let tokenService: TokenService;

  beforeEach(() => {
    auth = new AuthGuard(router as any, tokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('check for accesstoken false', async () => {
    cookie.get = jest.fn().mockReturnValueOnce(token);
    expect(await auth.canActivate()).toBe(false);
  });

  it('check for accesstoken false', async () => {
    cookie.get = jest.fn().mockReturnValueOnce(undefined);
    environment.LOCAL = false;
    console.error = jest.fn();
    expect(await auth.canActivate()).toBe(false);
  });
});
