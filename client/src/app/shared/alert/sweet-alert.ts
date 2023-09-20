import Swal from 'sweetalert2';

export class SweetAlert {
  swalMessage(title: string, msg: string) {
    Swal.fire(title, msg, 'info');
  }

  swalWarning(msg: string) {
    Swal.fire('Warning!', msg, 'warning');
  }

  swalError(msg: string) {
    Swal.fire('เกิดข้อผิดพลาด!', msg, 'error');
  }

  swalStandardError(resultDescription: string, developMessage: string) {
    Swal.fire({
      icon: 'error',
      title: resultDescription,
      html: `
        <p id="showText">Click to show/hide details</p>
        <p id="detailText" style="display: none;">${developMessage}</p>
      `,
      confirmButtonText: 'OK',
      didOpen: this.didOpen,
    });
  }

  didOpen() {
    const sweetAlertPopup = Swal.getPopup();
    if (sweetAlertPopup) {
      sweetAlertPopup.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.id === 'showText') {
          const detailText = document.getElementById('detailText');
          if (detailText && detailText.style.display === 'none') {
            detailText.style.display = 'block';
          } else if (detailText) {
            detailText.style.display = 'none';
          }
        }
      });
    }
  }

  swalError2(errorMsg: string, errorDetail: string) {
    Swal.fire({
      icon: 'error',
      title: errorMsg,
      text: errorDetail,
    });
  }

  swalInfo(msg: string) {
    Swal.fire('Info!', msg, 'info');
  }

  swalSuccess(msg: string) {
    Swal.fire('Finish!', msg, 'success');
  }
  //#endregion
}
