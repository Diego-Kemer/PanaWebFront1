import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
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
  public productoNew!: any;
  public rutaAdd!: boolean;
  public mensaje!: string;
  @Input() producto!: Producto;
  @Input() title!: string;
  @Output() actualizar = new EventEmitter;

  constructor(private fb: FormBuilder,
              private apiServ: ApiServicesService,
              private router: Router){}

  ngOnInit(){
    console.log()
    if(this.router.url == '/admin/addProd'){
      this.rutaAdd = true;
    }else{
      this.rutaAdd = false
    }
    if(this.producto){
      this.productoNew = {
        nombre: this.producto.name,
        descripcion: this.producto.description,
        precio: this.producto.price,
        img: this.producto.imagen,
        categoria: this.producto.categoria
      }
    }else{
      this.productoNew = {
        name: '',
        description: '',
        imagen: '',
        price: NaN,
        categoria: '',
        _id: ''
      }
    }
    this.fg = this.fb.group({
      name: [this.productoNew.nombre, [Validators.required, Validators.minLength(3)]],
      price: [ this.productoNew.precio,[Validators.required]],
      description: [this.productoNew.descripcion, [Validators.required, Validators.minLength(10)]],
      categoria: [this.productoNew.categoria, [Validators.required, Validators.minLength(3)]],
      imagen: [this.productoNew.img, [Validators.required]]
    })
    this.fg.valueChanges.subscribe(res=>{
      this.productoNew.nombre = res.name
      this.productoNew.descripcion = res.description
      this.productoNew.precio = res.price
    })
    
    
  }
  

  handleImage(e: any){
    this.image = e.target.files[0]
    const file = e.target.files[0]
    const filereader = new FileReader()
    filereader.readAsDataURL(file)
    filereader.onload = ()=>{
      this.productoNew.img = filereader.result
    }
    filereader.onerror = (error)=>{
      console.log(error)
    }
  }

  send(){
    this.apiServ.sendProduct(this.fg.value, this.image).subscribe(r=>{
      this.fg.reset()
      this.mensaje = 'ok'
      timer(2000).subscribe(()=>{this.mensaje = ''})
      this.image = '';
      this.productoNew.img = ''
    })  
  }
  edit(){
    if(this.image){
      this.apiServ.editProducto(this.fg.value, this.producto._id, this.image).subscribe(res=>{
        this.actualizar.next(true)
      })
    }else{
      this.apiServ.editProducto(this.fg.value, this.producto._id, null).subscribe(res=>{
        this.actualizar.next(true)
      })
    }
  }
}
