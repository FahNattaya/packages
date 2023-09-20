import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContactResponse } from 'src/app/shared/model/e-document.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { AppState } from 'src/app/store-ngrx/app.state';
import { getContractError, getContractImageData } from 'src/app/store-ngrx/selectors/e-document.selectors';

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.scss']
})
export class ContractPageComponent implements OnInit, OnDestroy {
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  textCancelButton: string = 'BACK';
  disabled: boolean = true;
  commitPathRouter: string = PathConstant.SIGN_CONTRACT_PAGE;
  cancelPathRouter: string = PathConstant.CAPTURE_ID_CARD;
  backPageUrl = PathConstant.CAPTURE_ID_CARD;

  contractData!: IContactResponse;
  contractImage: SafeResourceUrl | undefined;
  isLoading = true;
  sub!: Subscription;
  contractError?:any

  ngOnInit(): void {
    this.store.select(getContractError).subscribe((error) => {
      this.contractError = error
    }).unsubscribe();
    if(this.contractError){
      this.isLoading = false
      return
    }
    this.getContract();
  }

  getContract() {
    this.sub = this.store.select(getContractImageData).subscribe((res) => {
      if (res) {
        this.contractImage = this.convertBase64(res)
        this.isLoading = false
      }
    })
  }

  convertBase64(base64String: SafeResourceUrl | undefined): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${base64String}`
    );
  }

  confirmContract() {
    this.disabled = !this.disabled;
  }

  onNext() {
    this.router.navigate([this.commitPathRouter]);
  }

  onBack() {
    this.router.navigate([this.cancelPathRouter]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

