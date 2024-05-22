import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor() { }
  private categorySubject = new Subject<string>();
  categorySelected$ = this.categorySubject.asObservable();

  selectCategory(category: string) {
    this.categorySubject.next(category);
  }
}
