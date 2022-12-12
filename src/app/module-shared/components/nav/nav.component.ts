import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('enlaces') enlaces!: ElementRef;
  @ViewChild('btn') btn!: ElementRef;
  public icono: string = 'icofont-navigation-menu'

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  hamburguesa(){
    const elemento = this.enlaces.nativeElement;
    if(elemento.classList[1] === 'hamburguesa__enlaces--entrada'){
      this.renderer.removeClass(elemento, 'hamburguesa__enlaces--entrada')
      this.renderer.addClass(elemento, 'hamburguesa__enlaces--salida')
      this.icono = 'icofont-navigation-menu'
      timer(950).subscribe(()=>{
        this.renderer.removeClass(elemento, 'hamburguesa__enlaces--salida')
      })
    }else{
      this.renderer.removeClass(elemento, 'hamburguesa__enlaces--salida')
      this.renderer.addClass(elemento, 'hamburguesa__enlaces--entrada')
      this.icono = 'icofont-close'
    }
    
  }
}
