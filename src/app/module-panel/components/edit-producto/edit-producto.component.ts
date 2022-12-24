import { Component } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent {
  public item!: Producto;

}
