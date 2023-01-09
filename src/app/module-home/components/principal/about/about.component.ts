import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import {  interval } from 'rxjs';
import { DataService } from 'src/app/module-home/services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('about') about!: ElementRef;
  @ViewChild('texto') texto!: ElementRef;
  @ViewChildren('imagen') imagenes!: QueryList<ElementRef>;
  public img1!: string;
  public img2!: string;
  public img3!: string;

  constructor(private renderer: Renderer2,
              private dataServ: DataService) { }
  
  ngAfterViewInit(): void {
    window.addEventListener('scroll', ()=>{
      let scroll = this.about.nativeElement.getBoundingClientRect().top;
      const elemento = this.texto.nativeElement;
      if(elemento.classList[1] == 'about__texto--aparece'){return}
      if(scroll < 500){
        this.renderer.addClass(elemento, 'about__texto--aparece')
        this.imagenes.forEach((element: ElementRef )=>{
          this.renderer.addClass(element.nativeElement, 'about__imagen--aparece')
        })
      }
    })
    
    
  }

  ngOnInit(): void {
    this.dataServ.imagenes.subscribe(res=>{
      this.img1 = res[0].url;
      this.img2 = res[1].url;
      this.img3 = res[2].url;
    })
    
  }
  
  

}
