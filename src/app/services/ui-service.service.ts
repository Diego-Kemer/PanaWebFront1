import { EventEmitter, Injectable, Output} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
  loading$ = new Subject<boolean>();
  @Output() datos: EventEmitter<any> = new EventEmitter();

  constructor() { }

  show(){
    this.loading$.next(true)
  }
  hidden(){
    this.loading$.next(false)
  }
}
