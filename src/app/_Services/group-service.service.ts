import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {

  constructor() { }

  private groupSubject = new Subject<string>();
  groupSelected$ = this.groupSubject.asObservable();

  selectGroups(group: string) {
    this.groupSubject.next(group);
  }
}
