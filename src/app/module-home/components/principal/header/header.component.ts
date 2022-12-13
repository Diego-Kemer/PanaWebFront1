import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('quedarse') quedarse!: ElementRef;
  @ViewChild('irse') irse!: ElementRef;
  public imagen: string = 'assets/img/img1.jpg';
  public imagenAnimada: string = 'assets/img/img1.jpg'
  public imagenes: Array<string> = ['assets/img/img1.jpg', 'assets/img/img2.jpg', 'assets/img/img3.jpg', 'assets/img/img4.jpg'];
  public numero: number = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    interval(7000).subscribe(()=>{
      let indice = this.imagenes.indexOf(this.imagen)
      if(indice + 1 >= this.imagenes.length) {
        this.logic(3, 0, 'carousel__item--quedarse', 'carousel__item--irse')
        return
      };
      console.log(indice)
      this.logic(indice, indice + 1, 'carousel__item--quedarse', 'carousel__item--irse')
    })
  }

  nex(){
    const indice = this.imagenes.indexOf(this.imagen)
    if(this.quedarse.nativeElement.classList[1] === 'carousel__item--quedarse'){return}
    if(indice + 1 >= this.imagenes.length) {
      return
    };
    this.logic(indice, indice + 1, 'carousel__item--quedarse', 'carousel__item--irse')
  }

  back(){
    const indice = this.imagenes.indexOf(this.imagen)
    if(this.quedarse.nativeElement.classList[1] === 'carousel__item--quedarse1'){return}
    if(indice - 1 < 0) {return};
    this.logic(indice, indice - 1, 'carousel__item--quedarse1', 'carousel__item--irse1')
  }

  logic(index: number, calculo: any, clase1: string, clase2: string){
    const anterior = index;
    const nueva = calculo;
    this.imagenAnimada = this.imagenes[anterior]
    this.imagen = this.imagenes[nueva]
    const element = this.quedarse.nativeElement;
    const element1 = this.irse.nativeElement;
    this.renderer.addClass(element, clase1)
    this.renderer.addClass(element1, clase2)
    timer(1000).subscribe(()=>{
      this.renderer.removeClass(element, clase1)
      this.renderer.removeClass(element1, clase2)
    })
  }

}
