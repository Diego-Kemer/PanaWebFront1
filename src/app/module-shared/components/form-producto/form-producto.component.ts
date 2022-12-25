import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/modelo/producto';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit{
  public fg!: FormGroup;
  public image!: any;
  @Input() producto!: Producto;
  @Input() title!: string;

  constructor(private fb: FormBuilder,
              private apiServ: ApiServicesService){}

  ngOnInit(){
    this.fg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [ ,[Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoria: ['', [Validators.required, Validators.minLength(3)]],
      imagen: ['', [Validators.required]]
    })
    this.fg.valueChanges.subscribe(res=>{
      this.producto.name = res.name
      this.producto.description = res.description
      this.producto.price = res.price
    })
    
    if(this.producto){
      console.log(this.producto)
    }
    else{
      this.producto = {
        name: '',
        description: '',
        imagen: '',
        price: NaN,
        categoria: '',
        _id: ''
      }
    }
  }
  

  handleImage(e: any){
    this.image = e.target.files[0]
    const file = e.target.files[0]
    const filereader = new FileReader()
    filereader.readAsDataURL(file)
    filereader.onload = ()=>{
      this.producto.imagen = filereader.result
    }
    filereader.onerror = (error)=>{
      console.log(error)
    }
  }

  send(){
    this.apiServ.sendProduct(this.fg.value, this.image)
  }
}
