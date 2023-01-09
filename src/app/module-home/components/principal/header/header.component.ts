import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { interval, timer } from 'rxjs';
import { DataService } from 'src/app/module-home/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('quedarse') quedarse!: ElementRef;
  @ViewChild('irse') irse!: ElementRef;
  public imagen!: string;
  private imagen1!: any
  public imagenAnimada: string = ''
  public imagenes: Array<any> = [];
  public numero: number = 0;

  constructor(private renderer: Renderer2,
              private dataServ: DataService) { }

  ngOnInit(): void {
    this.dataServ.imagenes.subscribe(res=>{
      this.imagenes = res;
      this.imagen = res[0].url
      this.imagen1 = res[0]
    })
    interval(7000).subscribe(()=>{
      let indice = this.imagenes.indexOf(this.imagen1)
      if(indice + 1 >= this.imagenes.length) {
        this.logic(3, 0, 'carousel__item--quedarse', 'carousel__item--irse')
        return
      };
      this.logic(indice, indice + 1, 'carousel__item--quedarse', 'carousel__item--irse')
    })
  }

  nex(){
    const indice = this.imagenes.indexOf(this.imagen1)
    if(this.quedarse.nativeElement.classList[1] === 'carousel__item--quedarse'){return}
    if(indice + 1 >= this.imagenes.length) {
      return
    };
    this.logic(indice, indice + 1, 'carousel__item--quedarse', 'carousel__item--irse')
  }

  back(){
    const indice = this.imagenes.indexOf(this.imagen1)
    if(this.quedarse.nativeElement.classList[1] === 'carousel__item--quedarse1'){return}
    if(indice - 1 < 0) {return};
    this.logic(indice, indice - 1, 'carousel__item--quedarse1', 'carousel__item--irse1')
  }

  logic(index: number, calculo: any, clase1: string, clase2: string){
    const anterior = index;
    const nueva = calculo;
    this.imagenAnimada = this.imagenes[anterior]?.url
    this.imagen = this.imagenes[nueva]?.url
    this.imagen1 = this.imagenes[nueva]
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
