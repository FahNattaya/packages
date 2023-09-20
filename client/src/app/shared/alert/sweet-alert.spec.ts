import Swal from 'sweetalert2';
import { SweetAlert } from './sweet-alert';

jest.mock('sweetalert2');

describe('test sweet alert', () => {
  const mockSwal = Swal as jest.Mocked<typeof Swal>;
  let sweet: SweetAlert;

  beforeEach(() => {
    sweet = new SweetAlert();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fire message with given words', () => {
    const testMessage = 'test-swal-message';
    sweet.swalMessage(testMessage, 'arg');
    expect(mockSwal.fire).toHaveBeenCalledWith(testMessage, 'arg', 'info');
  });

  it('fire warning message with given words', () => {
    const testWarningMessage = 'test-swal-warning';
    sweet.swalWarning(testWarningMessage);
    expect(mockSwal.fire).toHaveBeenCalledWith(
      'Warning!',
      testWarningMessage,
      'warning',
    );
  });
  it('fire error message with given words', () => {
    const testErrorMessage = 'test-swal-warning';
    sweet.swalError(testErrorMessage);
    expect(mockSwal.fire).toHaveBeenCalledWith(
      'เกิดข้อผิดพลาด!',
      testErrorMessage,
      'error',
    );
  });

  it('swalStandardError', () => {
    const mockResultDescription = 'mockResultDescription';
    const mockDevelopMessage = 'mockDevelopMessage';
    const expectedResult = {
      icon: 'error',
      title: mockResultDescription,
      html: `
        <p id="showText">Click to show/hide details</p>
        <p id="detailText" style="display: none;">${mockDevelopMessage}</p>
      `,
      confirmButtonText: 'OK',
      didOpen: sweet.didOpen,
    };

    sweet.swalStandardError(mockResultDescription, mockDevelopMessage);
    expect(mockSwal.fire).toHaveBeenCalledWith(expectedResult);
  });

  it('didOpen display none', () => {
    const element = document.createElement('div');
    const detailText = document.createElement('div');
    element.id = 'showText';
    detailText.id = 'detailText';
    detailText.style.display = 'none';
    document.querySelector('body')?.appendChild(detailText);
    mockSwal.getPopup = jest.fn().mockReturnValueOnce(element);
    sweet.didOpen();
    const ev = new Event('click');
    element.dispatchEvent(ev);
    expect(mockSwal.getPopup).toHaveBeenCalled();
  });

  it('didOpen display block', () => {
    const element = document.createElement('div');
    const detailText = document.createElement('div');
    element.id = 'showText';
    detailText.id = 'detailText';
    detailText.style.display = 'block';
    document.querySelector('body')?.appendChild(detailText);
    mockSwal.getPopup = jest.fn().mockReturnValueOnce(element);
    sweet.didOpen();
    const ev = new Event('click');
    element.dispatchEvent(ev);
    expect(mockSwal.getPopup).toHaveBeenCalled();
  });

  test('swal info', () => {
    sweet.swalInfo('test');
    expect(mockSwal.fire).toHaveBeenCalled();
  });

  test('swal success', () => {
    sweet.swalSuccess('cool');
    expect(mockSwal.fire).toHaveBeenCalled();
  });

  test('swal error 2', () => {
    sweet.swalError2('error', 'detail');
    expect(mockSwal.fire).toHaveBeenCalled();
  });
});
