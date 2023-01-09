import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private apiServ: ApiServicesService,
              private dataServ: DataService) { }

  ngOnInit(): void {
    this.apiServ.traerImagenes().subscribe(res=>{
      this.dataServ.imagenes.next(res.data)
    })
  }

}
