import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelo/producto';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{
  public productos!: Array<Producto>;
  public page: number = 1;
  public totalPages!: number;
  public categoria!: string;
  public next: any;
  public prev: any;

  constructor(private apiServ: ApiServicesService){}

  ngOnInit(): void {
    this.cargarData(this.page)
  }
  cargarData(page: number){
    this.apiServ.traerProductos(page).subscribe((res: any)=>{
      this.docs(res)
    })
  }
  docs(res: any){
    this.productos = res.data.docs;
      this.next = res.data.hasNextPage;
      this.prev = res.data.hasPrevPage;
      this.page = res.data.page;
      this.totalPages = res.data.totalPages
  }
  siguiente(){
    if(this.categoria){
      this.traerPorCategoria(this.categoria, this.page+1)
      console.log('categoria')
    }
    if(!this.categoria){
      this.cargarData(this.page+1)
      console.log('all')
    }
  }
  previo(){
    if(this.categoria){
      this.traerPorCategoria(this.categoria, this.page-1)
      console.log('categoria')
    }
    if(!this.categoria){
      this.cargarData(this.page-1)
      console.log('all')
    }
    
  }

  traerPorCategoria(categoria: string, page = this.page){
    this.apiServ.traerProductosPorCategoria(page, categoria).subscribe(res=>{
      this.docs(res)
      this.categoria = categoria;
    })
  }
}
