import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import { PathConstant } from 'src/app/shared/constant/path.constant';
import { getQueueNo } from 'src/app/store-ngrx/selectors/queue.selectors';
import { firstValueFrom } from 'rxjs';
import { getOutChCustData } from 'src/app/store-ngrx/selectors/mc-config.selectors';

@Component({
  selector: 'app-success-queue-page',
  templateUrl: './success-queue-page.component.html',
  styleUrls: ['./success-queue-page.component.scss'],
})
export class SuccessQueuePageComponent implements OnInit {
  isDesktop?: boolean;
  flow: string = '';

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  backPageUrl = PathConstant.GEN_QUEUE_PAGE;
  textMainMenuButton: string = 'MAIN MENU';
  isConfirmContract: boolean = true;
  queueNo: string = '';

  async ngOnInit(): Promise<void> {
    this.queueNo = (await firstValueFrom(this.store.select(getQueueNo))) || '';
    this.store.select(getOutChCustData).subscribe((config) => {
      console.log(config, 'config');
      if (config) {
        this.flow = config.Flow;
      }
    });
  }

  onNext() {
    this.router.navigate([PathConstant.HANDSET_LIST_PAGE]);
  }
}
