import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit{
  public logo: any;

  constructor(private apiServ: ApiServicesService){}
  ngOnInit(): void {
    this.apiServ.traerLogo().subscribe(res=>{
      this.logo = res.data[0].url
      console.log(this.logo)
    })
  }
}
