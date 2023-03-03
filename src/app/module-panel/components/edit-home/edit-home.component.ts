import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent {
  public editImg: boolean = false;
  public url!: any;
  public formUrl = new FormControl({url: this.url})

  constructor(private apiServ: ApiServicesService){}
  formImg(){
    this.editImg = true;
  }
  formImgOff(){
    this.editImg = false;
  }
  sendImg(){
    this.apiServ.sendImagen(this.url).subscribe(res=>{
      console.log(res)
    })
  }

  foto(e: any){
    this.url = e.target?.files[0]
  }
  

}
