import { of } from 'rxjs';
import { CaptureIdCardPageComponent } from './capture-id-card-page.component';
import { IGetCondition } from 'src/app/shared/model/e-document.model';

describe('CaptureIdCardPageComponent', () => {
  let component: CaptureIdCardPageComponent;
  const router = {
    navigate: jest.fn(),
  };
  const store = {
    dispatch: jest.fn(),
    select: jest.fn().mockImplementation(() => ({ subscribe: jest.fn() })),
  };
  const locationService = {
    getLocationName: jest.fn(),
  }
  const eDocumentService = {
    getCondition: jest.fn(),
  };
  const McConfigService = {
    getCompanyName: jest.fn()
  };

  beforeEach(async () => {
    component = new CaptureIdCardPageComponent(
      router as any,
      store as any,
      locationService as any,
      eDocumentService as any,
      McConfigService as any,
    );
    console.log = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get image capture', () => {
    const text = 'image'

    component.getImageCapture(text);

    expect(component.image).toEqual(text);
  });

  it('should format id card to concealed as a secret', () => {
    expect(component.formatIdCard('1234567890000')).toBe('xxxxxxxxx0000')
  })

  it('should return locationName', async () => {
    const locationName: string = 'สาขาอาคารเอไอเอส 2'
    locationService.getLocationName.mockReturnValue(of({
      locationName: locationName
    }))

    const result = await component.getLocationName('1100')

    expect(result).toBe(locationName)
  })

  it('should return conditionText', async () => {
    const conditionCode: string = 'CONDITION_1'
    const conditionText: string = '<p>1) ข้าพเจ้าตกลงใช้บริการโทรศัพท์ที่เลือกซื้อ กับการใช้บริการหมายเลขโทรศัพท์เคลื่อนที่ในระบบ AIS รายเดือน ตามแพ็กเกจค่าบริการรายเดือนข้างต้น โดยใช้บริการต่อเนื่องตามระยะเวลาที่กำหนด และชำระค่าใช้บริการภายในวันที่บริษัทฯ กำหนด นับตั้งแต่วันที่ทำข้อตกลงฉบับนี้ หรือนับระยะเวลาต่อเนื่องจากข้อตกลงใช้บริการฉบับอื่นที่ข้าพเจ้าได้ตกลงไว้ก่อนหน้านี้ ซึ่งยังคงมีผลใช้บังคับอยู่<br />2) กรณีข้าพเจ้ายกเลิก หรือถูกยกเลิกบริการ ขอเปลี่ยนแปลงหมายเลขโทรศัพท์ ขอย้ายเครือข่ายเลขหมายเดิม ขอโอนเปลี่ยนเจ้าของ หรือขอเปลี่ยนเป็นระบบเติมเงิน ก่อนครบกำหนดเวลาที่ตกลงไว้ ถือว่าข้าพเจ้าผิดข้อตกลงนี้ และยินยอมให้บริษัทฯ มีสิทธิ์ระงับการใช้เครื่องโทรศัพท์ดังกล่าวได้ทันที รวมทั้งตกลงชำระค่าปรับเท่ากับส่วนลดค่าเครื่อง (ก่อน VAT) ตามที่ได้รับให้แก่บริษัท แอดวานซ์ ไวร์เลส เน็ทเวอร์ค จำกัด ในวันที่ยกเลิกบริการ หรือผิดข้อตกลงทันที และไม่ขอรับค่าแพ็กเกจบริการล่วงหน้าที่ชำระในโครงการนี้คืน<br /><p><br />ผู้ใช้บริการที่ซื้อเครื่องโทรศัพท์รุ่นที่กำหนด รับทราบข้อจำกัดทางเทคนิคว่าต้องใช้กับซิมการ์ดหมายเลขที่ตกลงรับสิทธิ์เท่านั้น หากนำซิมการ์ดหมายเลขอื่นหรือมิใช่ซิม AIS มาร่วมใช้กับเครื่อง จะไม่สามารถใช้งานเครื่องโทรศัพท์ได้<br /><br />ผู้ใช้บริการที่ซื้อเครื่องโทรศัพท์รุ่นที่กำหนด รับทราบและยินยอมให้บริษัทดำเนินการดังต่อไปนี้ได้ทันที<br />&nbsp; 1. ต้องชำระค่าบริการตามแพ็กเกจข้างต้นภายในวันที่บริษัทฯ กำหนด กรณีชำระค่าบริการล่าช้า บริษัทฯ จะส่งข้อความแจ้งเตือน และหากผิดนัดชำระค่าบริการของหมายเลขโทรศัพท์ตามที่ระบุไว้ในข้อตกลงรับสิทธิ์ฉบับนี้ จนเป็นเหตุให้หมายเลขดังกล่าวถูกระงับการโทรออกและรับสายเข้า เครื่องโทรศัพท์จะล็อกและใช้ไม่ได้ในทันที<br />&nbsp; 2. กรณีมีการแก้ไขดัดแปลงซอฟต์แวร์ของเครื่องโทรศัพท์ Samsung บริษัทถือว่าเป็นกระทำผิดเงื่อนไขข้อตกลงฉบับนี้ และเครื่องจะถูกล็อกและใช้งานไม่ได้ในทันที หากภายหลังข้าพเจ้าประสงค์จะใช้เครื่องโทรศัพท์ต่อไป ข้าพเจ้าตกลงชำระค่าปรับเท่ากับส่วนลดค่าเครื่อง (ก่อน VAT) ตามที่ได้รับ ให้แก่บริษัท แอดวานซ์ ไวร์เลส เน็ทเวอร์ค จำกัด</p>'
    const getCondition: IGetCondition = {
      conditionCode: conditionCode,
      location: '1100'
    }
    eDocumentService.getCondition.mockReturnValue(of({
      statusCode: '200',
      statusDesc: 'success',
      data: {
        conditionCode: conditionCode,
        conditionName: 'NAME',
        conditionText: conditionText
      }
    }))

    const result = await component.getConditionText(getCondition)

    expect(result).toBe(conditionText)
  })

  it('should return company thai name', async () => {
    const COMPANY_ABBR: string = 'AWN'
    const companyNameTH: string = 'บริษัท แอดวานซ์ ไวร์เลส เน็ทเวอร์ค จำกัด';
    McConfigService.getCompanyName.mockReturnValue(of({
      COMPANY_ABBR: COMPANY_ABBR,
      NAME_TH: companyNameTH,
      NAME_EN: 'Advanced Wireless Network Company',
    }))

    const result = await component.getCompanyProductNameTH(COMPANY_ABBR)

    expect(result).toBe(companyNameTH)
  })

});
