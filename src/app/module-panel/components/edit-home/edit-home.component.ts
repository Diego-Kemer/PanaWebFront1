import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent implements OnInit{
  public formText!: FormGroup;
  public formPromo!: FormGroup;
  public formDatos!: FormGroup;
  public editImg: boolean = false;
  public imagenes: Array<any> = []
  public promociones: Array<any> = [];
  public url!: any;
  public formUrl = new FormControl({url: this.url})
  public logo:any;
  private id: any;
  private image: any;
  public imgSelect: any;
  public imgSelected: any;
  private texto: any;
  public editPromociones: boolean = false;
  public promoSelect: any;
  public imgSel: any;
  public datos: any;

  

  constructor(private apiServ: ApiServicesService,
              private fb: FormBuilder){}

  ngOnInit(): void {
    //Cargamos datos
    this.apiServ.traerImagenes().subscribe(res=>{
      this.imagenes = res.data
    })
    this.apiServ.traerLogo().subscribe(res=>{
      this.logo = res.data[0].url;
      this.id = res.data[0]._id;
    })
    this.apiServ.traerTextos().subscribe(res=>{
      this.texto = res.data[0]
      this.onPatchValue()
      console.log(this.texto)
    })
    this.apiServ.traerPromos().subscribe(res=>{
      this.promociones = res.data
    })
    this.apiServ.traerDatos().subscribe(res=>{
      this.datos = res.data[0]
      const {nombre ,face ,insta ,email , wspp ,color1 ,color2} = this.datos
      this.formDatos.patchValue({
        nombre ,face ,insta ,email , wspp ,color1 ,color2
      })
    })
    //-----------------------------------
    this.formPromo = this.fb.group({
      titulo: ['', [Validators.minLength(10), Validators.required]],
      descripcion: ['', [Validators.minLength(10), Validators.required]],
      precio: [Number, [Validators.required]]
    })
    this.formText = this.fb.group({
      textLanding: ['', [Validators.minLength(10), Validators.required]],
      textAbout: ['', [Validators.minLength(10), Validators.required]]
    })
    this.formDatos = this.fb.group({
      nombre: ['', [Validators.minLength(3), Validators.required]],
      face: '',
      insta: '',
      email: ['', [Validators.email, Validators.required]],
      wspp: Number,
      color1: ['', Validators.required],
      color2: ['', Validators.required]
    })
  }
  onPatchValue(): void{
    this.formText.patchValue({
      textLanding: this.texto.textLanding,
      textAbout: this.texto.textAbout
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
      if(revisar == 'carru'){ 
        this.imgSelected = filereader.result
      }
      if(revisar == 'promo'){
        this.imgSel = filereader.result
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

  saveTexto(){
    const datos = {
      textAbout: this.formText.value.textAbout, 
      textLanding: this.formText.value.textLanding
    } 
    this.apiServ.guardarTexto(datos, this.texto._id).subscribe(res=>{
      console.log(res)
    })
  }

  abrir(i: any){
    this.editPromociones = true
    this.promoSelect = i
    this.imgSel = i.img
  }
  cerrarPromo(){
    this.editPromociones = false
  }

  imgPromo(e: any){
    this.handleImage(e, 'promo')
  }
  actualizarPromo(){
    const {titulo, descripcion, precio} = this.formPromo.value
    let datos = {
      titulo,
      descripcion,
      precio
    }
    this.apiServ.actualizarPromo(datos, this.image, this.promoSelect._id).subscribe(res=>{
      console.log(res)
      this.apiServ.traerPromos()
      this.editPromociones = false
    })
  }

  guardarDatos(){
    console.log(this.formDatos.value)
    this.apiServ.actualizarDatos(this.datos._id, this.formDatos.value).subscribe(res=>{
      console.log(res)
    })
  }

}
