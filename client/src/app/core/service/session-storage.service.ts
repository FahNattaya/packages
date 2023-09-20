import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class SessionStorageService {
    private storage: Storage;
  
    constructor() {
      this.storage = sessionStorage;
    }
  
    getItem(key: string): any {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  
    setItem(key: string, value: any): void {
      this.storage.setItem(key, JSON.stringify(value));
    }
  
    removeItem(key: string): void {
      this.storage.removeItem(key);
    }
  }
  