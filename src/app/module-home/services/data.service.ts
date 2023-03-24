import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Output() imagenes = new EventEmitter()
  @Output() textos = new EventEmitter()
  
  constructor() { }
}
