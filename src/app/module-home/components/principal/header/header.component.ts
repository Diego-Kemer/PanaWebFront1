import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('quedarse') quedarse!: ElementRef;
  @ViewChild('irse') irse!: ElementRef;
  public imagen: string = 'assets/img/img4.jpg';
  public imagenAnimada: string = 'assets/img/img4.jpg'
  public imagenes: Array<string> = ['assets/img/img1.jpg', 'assets/img/img2.jpg', 'assets/img/img3.jpg', 'assets/img/img4.jpg'];
  public numero: number = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.imagen = this.imagenes[3]
    interval(5000).subscribe(v =>{
      v > 0 ? this.imagenAnimada = this.imagen : false;
      this.numero < this.imagenes.length ? this.imagen = this.imagenes[this.numero] : false;
      this.numero++;
      this.numero >= this.imagenes.length ? this.numero = 0 : false;
      this.renderer.addClass(this.quedarse.nativeElement, 'carousel__item--quedarse')
      this.renderer.addClass(this.irse.nativeElement, 'carousel__item--irse')
      setTimeout(()=>{
        this.renderer.removeClass(this.quedarse.nativeElement, 'carousel__item--quedarse')
        this.renderer.removeClass(this.irse.nativeElement, 'carousel__item--irse')
      }, 1100)
    })
  }

  nex(){
    if(this.quedarse.nativeElement.classList[1] == 'carousel__item--quedarse'){return}
    if(this.numero < this.imagenes.length){
      this.imagenAnimada = this.imagen;
      this.numero < this.imagenes.length ? this.imagen = this.imagenes[this.numero] : false;
      this.numero++;
      this.numero >= this.imagenes.length ? this.numero = 0 : false;
      this.renderer.addClass(this.quedarse.nativeElement, 'carousel__item--quedarse')
      this.renderer.addClass(this.irse.nativeElement, 'carousel__item--irse')
      setTimeout(()=>{
        this.renderer.removeClass(this.quedarse.nativeElement, 'carousel__item--quedarse')
        this.renderer.removeClass(this.irse.nativeElement, 'carousel__item--irse')
      }, 1000)
    }else{console.log('mal')}
  }

  back(){
    if(this.numero > 0){
      if(this.imagen == this.imagenes[this.numero-1] && this.numero > 1){this.numero = this.numero - 2}else{this.numero--;} 
      this.imagen = this.imagenes[this.numero]
      console.log(this.numero)
    }else{console.log('mal')}
  }

}
