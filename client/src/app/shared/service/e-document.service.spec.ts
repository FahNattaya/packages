import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EDocumentService } from './e-document.service';
import { IContactRequest, IContactResponse } from '../model/e-document.model';

describe('ContractService', () => {
  let service: EDocumentService;
  let httpMock: HttpTestingController;
  const mockPoint = {} as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EDocumentService]
    });
    service = TestBed.inject(EDocumentService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be callable', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve contract data from the given url', () => {
    const mockResponse: IContactResponse = {
      resultCode: '200',
      resultDescription: 'success',
      developerMessage: 'success',
      data: 'base64'
    };
    const mockReq: IContactRequest = {
      campaignName: "AIS Best Buy 12M (Test Installment and Compensation)",
      locationName: "สาขาอาคารเอไอเอส 2",
      idCard: "1111111111119",
      titleName: "นางสาว",
      fullName: "ทดสอบ ทดสอบระบบ",
      mobileNumber: "01234569789",
      brand: "APPLE",
      model: "IP12_128GB",
      color: "BLACK",
      priceIncludeVat: '31900.00',
      discountIncludeVat: '3000.00',
      netPrice: '28900.00',
      contract: 12,
      advancePay: '0.00',
      mobileCarePackageTitle: "APPLE CARE",
      condition: "<p>1) ข้าพเจ้าตกลงใช้บริการโทรศัพท์ที่เลือกซื้อ กับการใช้บริการหมายเลขโทรศัพท์เคลื่อนที่ในระบบ AIS รายเดือน ตามแพ็กเกจค่าบริการรายเดือนข้างต้น โดยใช้บริการต่อเนื่องตามระยะเวลาที่กำหนด และชำระค่าใช้บริการภายในวันที่บริษัทฯ กำหนด นับตั้งแต่วันที่ทำข้อตกลงฉบับนี้ หรือนับระยะเวลาต่อเนื่องจากข้อตกลงใช้บริการฉบับอื่นที่ข้าพเจ้าได้ตกลงไว้ก่อนหน้านี้ ซึ่งยังคงมีผลใช้บังคับอยู่<br />2) กรณีข้าพเจ้ายกเลิก หรือถูกยกเลิกบริการ ขอเปลี่ยนแปลงหมายเลขโทรศัพท์ ขอย้ายเครือข่ายเลขหมายเดิม ขอโอนเปลี่ยนเจ้าของ หรือขอเปลี่ยนเป็นระบบเติมเงิน ก่อนครบกำหนดเวลาที่ตกลงไว้ ถือว่าข้าพเจ้าผิดข้อตกลงนี้ และยินยอมให้บริษัทฯ มีสิทธิ์ระงับการใช้เครื่องโทรศัพท์ดังกล่าวได้ทันที รวมทั้งตกลงชำระค่าปรับเท่ากับส่วนลดค่าเครื่อง (ก่อน VAT) ตามที่ได้รับให้แก่บริษัท แอดวานซ์ ไวร์เลส เน็ทเวอร์ค จำกัด ในวันที่ยกเลิกบริการ หรือผิดข้อตกลงทันที และไม่ขอรับค่าแพ็กเกจบริการล่วงหน้าที่ชำระในโครงการนี้คืน<br /><p><br />ผู้ใช้บริการที่ซื้อเครื่องโทรศัพท์รุ่นที่กำหนด รับทราบข้อจำกัดทางเทคนิคว่าต้องใช้กับซิมการ์ดหมายเลขที่ตกลงรับสิทธิ์เท่านั้น หากนำซิมการ์ดหมายเลขอื่นหรือมิใช่ซิม AIS มาร่วมใช้กับเครื่อง จะไม่สามารถใช้งานเครื่องโทรศัพท์ได้<br /><br />ผู้ใช้บริการที่ซื้อเครื่องโทรศัพท์รุ่นที่กำหนด รับทราบและยินยอมให้บริษัทดำเนินการดังต่อไปนี้ได้ทันที<br />&nbsp; 1. ต้องชำระค่าบริการตามแพ็กเกจข้างต้นภายในวันที่บริษัทฯ กำหนด กรณีชำระค่าบริการล่าช้า บริษัทฯ จะส่งข้อความแจ้งเตือน และหากผิดนัดชำระค่าบริการของหมายเลขโทรศัพท์ตามที่ระบุไว้ในข้อตกลงรับสิทธิ์ฉบับนี้ จนเป็นเหตุให้หมายเลขดังกล่าวถูกระงับการโทรออกและรับสายเข้า เครื่องโทรศัพท์จะล็อกและใช้ไม่ได้ในทันที<br />&nbsp; 2. กรณีมีการแก้ไขดัดแปลงซอฟต์แวร์ของเครื่องโทรศัพท์ Samsung บริษัทถือว่าเป็นกระทำผิดเงื่อนไขข้อตกลงฉบับนี้ และเครื่องจะถูกล็อกและใช้งานไม่ได้ในทันที หากภายหลังข้าพเจ้าประสงค์จะใช้เครื่องโทรศัพท์ต่อไป ข้าพเจ้าตกลงชำระค่าปรับเท่ากับส่วนลดค่าเครื่อง (ก่อน VAT) ตามที่ได้รับ ให้แก่บริษัท แอดวานซ์ ไวร์เลส เน็ทเวอร์ค จำกัด</p>",
      companyProduct: "แอดวานซ์ ไวร์เลส เน็ทเวอร์ค จำกัด",
      idCardType: "ID_CARD",
      summaryPrice: '35900.00'
    }

    service.postContract(mockReq).subscribe((data: IContactResponse) => {
      expect(data).toEqual(mockResponse);
    });

    const mockRequest = httpMock.expectOne('/api/device-sales/v1/e-document/e-contract');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual(mockReq);
  });

  test('save with undefined input', ()=> {
    service.saveSign(undefined);
    expect(service.sign).toEqual([]);
  })

  test('save with data', ()=>{
    service.saveSign([mockPoint, mockPoint]);
    expect( service.sign.length ).toBe(2);
  });

  test('load saved data', ()=>{
    service.sign = [mockPoint,mockPoint];
    expect( service.loadSign().length ).toBe(2);
  });
});
