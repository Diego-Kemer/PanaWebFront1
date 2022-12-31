import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
    this.cargarData()
  }
  cargarData(){
    this.apiServ.traerProductos(1).subscribe((res: any)=>{
      this.productos = res.data.docs
    })
  }

  edit(item: Producto){
    this.item = item;
    this.editar = true;
  }

  delete(item: Producto){
    if(confirm(`Desea eliminar el producto ${item.name}?`)){
      this.apiServ.eliminarProducto(item._id).subscribe(res=>{
        this.cargarData()
      })
    }
    
  }

}
