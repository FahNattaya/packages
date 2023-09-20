import { of } from "rxjs";
import { McConfigService } from "./mc-config.service";
import { SharedService } from "./shared.service";

let mockHttp = {
  get: jest.fn(),
  post: jest.fn(),
};

describe('MC Config', () => {
  let service: McConfigService;
  beforeEach(()=>{
    service = new McConfigService(mockHttp as any, new SharedService());
  });

  test('Get Config', (done)=>{
    mockHttp.post = jest.fn().mockReturnValueOnce(of('hello'));
    service.getConfig('AIS').subscribe(d=>{
      expect(d).toEqual('hello');
      done();
    });
  });
});
