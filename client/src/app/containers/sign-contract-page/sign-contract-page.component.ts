import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SignaturePad, { PointGroup } from 'signature_pad';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { EDocumentService } from 'src/app/shared/service/e-document.service';

@Component({
  selector: 'app-sign-contract-page',
  templateUrl: './sign-contract-page.component.html',
  styleUrls: ['./sign-contract-page.component.scss'],
})
export class SignContractPageComponent implements OnInit, OnDestroy {
  canvas?: HTMLCanvasElement;
  pad?: SignaturePad;
  constructor(
    private router: Router,
    private eDocumentService: EDocumentService
  ) { }

  content: string = `ข้าพเจ้าขอรับรองว่าลายมือชื่อในใบแบบคำขอนี้ และใบเอกสารแบบคำขอฉบับนี้ (ถ้ามี) เป็นลายมือชื่อที่แท้จริงของข้าพเจ้า ข้าพเจ้าได้อ่านเข้าใจและตกลงใช้บริการตาม รายละเอียด “ข้อตกลงและเงื่อนไขการให้บริการโทรศัพท์เคลื่อนที่ฯ และข้อตกลงให้เก็บ รวบรวม ใช้ เปิดเผยข้อมูล” ของ บริษัทแอดวานซ์ ไวร์เลส เน็กเวอร์ค จำกัด รายละเอียด www.ais.co.th/pdfAWN_Post-Paid.pdf ทั้งนี้ข้าพเจ้ายินยอมให้บริษัทจำกัดวงเงินการใช้บริการ
  เพื่อเป็นหลักฐานจึงได้ลงลายมือชื่อและประทับตรา (ถ้ามี) ไว้เป็นสำคัญ`;

  textCommitButton: string = 'NEXT';
  textCancelButton: string = 'BACK';
  backPageUrl = PathConstant.CONTRACT_PAGE;
  ngOnInit(): void {
    this.setupCanvas()
    this.callSign()
  }

  ngOnDestroy() {
    this.saveSign()
  }

  setupCanvas() {
    if (!this.canvas) this.canvas = document.querySelector('#sign-sigpad') as HTMLCanvasElement;
    this.pad = new SignaturePad(this.canvas);
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext('2d')?.scale(ratio, ratio);
  }

  isSigned(): boolean {
    return this.pad ? !this.pad.isEmpty() : false ;
  }

  saveSign(): void {
    const data = this.pad?.toData();
    this.eDocumentService.saveSign(data)
  }

  callSign(): void {
    const sign: PointGroup[] = this.eDocumentService.loadSign()
    this.pad?.fromData(sign);
  }

  onClearSignature(): void {
    this.pad?.clear();
    this.eDocumentService.sign = []
  }

  getCurrentData(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear() + 543;
    const mm: number = today.getMonth() + 1;
    const dd: number = today.getDate();
    let day: string = dd < 10 ? '0' + dd : dd.toString();
    let month: string = mm < 10 ? '0' + mm : mm.toString();

    return day + '/' + month + '/' + year;
  }

  onNext(): void {
    this.router.navigate([PathConstant.GEN_QUEUE_PAGE]);
  }

  onBack(): void {
    this.router.navigate([PathConstant.CONTRACT_PAGE]);
  }
}
