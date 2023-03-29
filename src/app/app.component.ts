import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from './services/api-services.service';
import { UiServiceService } from './services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private uiServ: UiServiceService, 
              private apiServ: ApiServicesService){}
  loading$: any;
  datos: any;
  title = 'panaderiaWeb';
  
  ngOnInit(): void {
    this.loading$ = this.uiServ.loading$;
    this.apiServ.traerDatos().subscribe(res=>{
      this.datos = res.data[0]
      this.title = this.datos.nombre
      this.uiServ.datos.next(this.datos)
    })
  }
}
