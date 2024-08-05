import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor() { }
 /*  private categorySubject = new Subject<string>();
  categorySelected$ = this.categorySubject.asObservable();

  selectCategory(category: string) {
    this.categorySubject.next(category);
  } */
  private categorySubject = new Subject<{category: string, group: string}>();
  categorySelected$ = this.categorySubject.asObservable();

  selectCategory(category: string, group: string) {
    this.categorySubject.next({category, group});
  }

}
