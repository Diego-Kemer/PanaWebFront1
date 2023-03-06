import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent implements OnInit {
  public editImg: boolean = false;
  public imagenes: Array<any> = []
  public url!: any;
  public formUrl = new FormControl({url: this.url})
  public logo:any;
  private id: any;
  private image: any;
  public imgSelect: any;
  public imgSelected: any;

  constructor(private apiServ: ApiServicesService){}

  ngOnInit(): void {
    this.apiServ.traerImagenes().subscribe(res=>{
      this.imagenes = res.data
    })
    this.apiServ.traerLogo().subscribe(res=>{
      this.logo = res.data[0].url;
      this.id = res.data[0]._id;
    })
  }
  formImg(iten: any){
    this.editImg = true;
    this.imgSelected = iten.url
    this.imgSelect = iten
  }
  formImgOff(){
    this.editImg = false;
  }
  sendImg(){
    this.apiServ.sendImagen(this.url).subscribe(res=>{
      console.log(res)
    })
  }
  actualizarImg(){
    this.apiServ.actualizarImagen(this.url, this.imgSelect._id).subscribe(res=>{
      console.log(res)
    })
  }

  foto(e: any){
    this.url = e.target?.files[0]
    this.handleImage(e, 'carru')
  }
  cambiarLogo(e: any){
    this.handleImage(e, 'logo')
  }
  handleImage(e: any, revisar: string){
    this.image = e.target.files[0]
    const file = e.target.files[0]
    const filereader = new FileReader()
    filereader.readAsDataURL(file)
    filereader.onload = ()=>{
      if(revisar == 'logo'){
        this.logo = filereader.result
      }
      else{
        this.imgSelected = filereader.result
      }
    }
    filereader.onerror = (error)=>{
      console.log(error)
    }
  }
  saveLogo(){
    this.apiServ.actualizarLogo(this.id, this.image).subscribe(res=>{
      console.log(res)
    })
  }

}
