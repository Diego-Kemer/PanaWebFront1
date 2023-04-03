import { Component, OnInit} from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit{
  public presentacion: any;

  constructor(private apiServ: ApiServicesService) { }
 
  ngOnInit(): void {
    this.apiServ.traerPresentacion().subscribe(res=>{
      this.presentacion = res.data[0]
    })
  }

}
