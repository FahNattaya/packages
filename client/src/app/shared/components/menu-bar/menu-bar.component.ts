import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-ngrx/app.state';
import {  getScanImeiProduct } from 'src/app/store-ngrx/selectors/mc-config.selectors';
import { saveSearchWord } from '../../../store-ngrx/actions/product.action';
import { getSearchWord } from 'src/app/store-ngrx/selectors/product.selectors';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  @Input() isShowSearch: boolean = true;
  @Input() isShowCategory: boolean = true;
  @Input() isShowFilter: boolean = true;
  @Input() isShowLocation: boolean = false;
  @Input() typeInputSearch: string = 'search';
  @Input() locationName: string = '';
  @Input() imeiCode: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() imei: EventEmitter<boolean> = new EventEmitter<boolean>();
  OutChannelSalesData$ = this.store.select(getScanImeiProduct);
  searchValue = new FormControl('', {nonNullable:true});

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.select(getSearchWord).subscribe(word => {
      if (word) {
        this.searchValue.patchValue(word);
      }
    })
  }

  onEnter(event: any) {
    if (event.key ==='Enter') {
      this.onSearch();
    }
  }
  onSearch() { 
    this.store.dispatch(saveSearchWord({searchWord: this.searchValue.value}))
    this.search.emit(this.searchValue.value);
  }

  onScanImei() {
    this.imei.emit(true);
  }
  clearSearchInput(){
    this.searchValue.reset();
    this.onSearch();
   }
  
}
