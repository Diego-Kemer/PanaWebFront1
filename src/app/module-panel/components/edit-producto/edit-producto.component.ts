import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit{
  public item!: Producto;
  public editar: boolean = false;
  public productos!: Array<Producto>;

  constructor(private apiServ: ApiServicesService){}

  ngOnInit(): void {
    this.apiServ.traerProductos(1).subscribe((res: any)=>{
      this.productos = res.data.docs
      console.log(res)
    })
  }

  edit(item: Producto){
    this.item = item;
    this.editar = true;
  }

}
