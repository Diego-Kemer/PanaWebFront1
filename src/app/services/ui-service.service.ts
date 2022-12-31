import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  loading$ = new Subject<boolean>();

  constructor() { }

  show(){
    this.loading$.next(true)
  }
  hidden(){
    this.loading$.next(false)
  }
}
