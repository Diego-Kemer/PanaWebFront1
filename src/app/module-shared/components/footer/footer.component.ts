import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public datos: any;
  public logo: any;

  constructor(private uiServ: UiServiceService,
    private apiServ: ApiServicesService) { }

  ngOnInit(): void {
    this.uiServ.datos.subscribe(res=>{
      this.datos = res;
    })
    this.apiServ.traerLogo().subscribe(res=>{
      this.logo = res.data[0].url
    })
  }

}
