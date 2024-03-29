// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private dataSourceSubject = new BehaviorSubject<any[]>([]);
  dataSource$ = this.dataSourceSubject.asObservable();

  constructor() { }

  updateDataSource(data: any[]) {
    this.dataSourceSubject.next(data);
  }
}
