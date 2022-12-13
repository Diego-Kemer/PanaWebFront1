import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import {  interval } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('about') about!: ElementRef;
  @ViewChild('texto') texto!: ElementRef;
  @ViewChildren('imagen') imagenes!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) { }
  
  ngAfterViewInit(): void {
    window.addEventListener('scroll', ()=>{
      let scroll = this.about.nativeElement.getBoundingClientRect().top;
      const elemento = this.texto.nativeElement;
      if(elemento.classList[1] == 'about__texto--aparece'){return}
      if(scroll < 400){
        this.renderer.addClass(elemento, 'about__texto--aparece')
        this.imagenes.forEach((element: ElementRef )=>{
          this.renderer.addClass(element.nativeElement, 'about__imagen--aparece')
        })
      }
    })
    
    
  }

  ngOnInit(): void {
    
    
  }
  
  

}
