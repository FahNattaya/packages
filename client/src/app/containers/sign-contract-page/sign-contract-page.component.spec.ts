import { SignContractPageComponent } from './sign-contract-page.component';
import SignaturePad from 'signature_pad'
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { EDocumentService } from 'src/app/shared/service/e-document.service';

jest.mock('signature_pad', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        clear: jest.fn(),
        isEmpty: jest.fn(),
        fromData: jest.fn(),
        toData: jest.fn(),
      }
    })
  };
});

describe('SignContractPageComponent', () => {
  let router = { navigate: jest.fn() } as any;
  let component: SignContractPageComponent;
  let service: EDocumentService;

  beforeEach(async () => {
    component = new SignContractPageComponent(router, service);
  });


  it('should navigate', () => {
    component.onBack();
    expect(router.navigate).toHaveBeenCalledWith([PathConstant.CONTRACT_PAGE]);
    component.onNext();
    expect(router.navigate).toHaveBeenCalledWith([PathConstant.GEN_QUEUE_PAGE]);
  });

  it('should call isEmpty', () => {
    component.pad = { isEmpty: jest.fn() } as unknown as SignaturePad;
    component.isSigned();
    expect(component.pad.isEmpty).toBeCalled();
  });


  it('[getCurrentData] should return today format `dd/mm/yyyy`', () => {
    const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    expect(component.getCurrentData()).toMatch(regex)
  });


  test('isSigned return false if pad is undefined',()=>{
    component.pad = undefined;
    expect( component.isSigned() ).toBeFalsy();
  });
});
