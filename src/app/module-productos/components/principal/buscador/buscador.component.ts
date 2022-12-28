import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  @ViewChild('select') select!: ElementRef
  @Output() productosPorCate = new EventEmitter;
  public categoria!: any;


  pedir(){
    const cate = this.select.nativeElement.value;
    this.productosPorCate.next(cate)
  }
}
