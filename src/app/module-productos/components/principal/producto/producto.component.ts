import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  @Input() producto!: Producto;

}
