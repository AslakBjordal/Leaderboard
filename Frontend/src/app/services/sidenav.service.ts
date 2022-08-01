import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor() {}

  private isOpen = new BehaviorSubject<boolean>(false);

  setIsOpen = (open: boolean) => this.isOpen.next(open);
  getIsOpen = () => this.isOpen.asObservable();
}
