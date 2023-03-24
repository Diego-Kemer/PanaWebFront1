import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css']
})
export class PromocionComponent implements OnInit, AfterViewInit{
  @ViewChild('promociones') promociones!: ElementRef;
  @ViewChildren('animado') animados!: QueryList<ElementRef>;
  public promocions!: Array<any>;

  constructor( private renderer: Renderer2,
                private apiServ: ApiServicesService) { }

  ngOnInit(): void {
    this.apiServ.traerPromos().subscribe(res=>{
      this.promocions = res.data
    })
    }
  
  ngAfterViewInit(): void {
    window.addEventListener('scroll', ()=>{
      const scroll = this.promociones.nativeElement.getBoundingClientRect().top;
      if(scroll < 500){
        this.animados.forEach((element: ElementRef)=>{
          if(element.nativeElement.classList[1] == "promociones__item--efecto"){return}
          this.renderer.addClass(element.nativeElement, 'promociones__item--efecto')
        })
      }
    })
    
  }

  

}
