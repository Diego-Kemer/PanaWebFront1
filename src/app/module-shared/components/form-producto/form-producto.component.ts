import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit{
  public fg!: FormGroup;
  public image!: any;

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
    
  }

  handleImage(e: any){
    this.image = e.target.files[0]
    console.log(this.fg.value)
  }

  send(){
    this.apiServ.sendProduct(this.fg.value, this.image)
  }
}
