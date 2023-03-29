import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ref, Storage, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL } from '@firebase/storage';
import { map, mergeMap, Observable, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../modelo/producto';
import { UiServiceService } from './ui-service.service';


@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  private filePath: any;
  @Output() image = new EventEmitter;
  private appUrl: string = environment.apiUrl;

  constructor( private storage: Storage,
                private http: HttpClient,
                private uiServ: UiServiceService) { }


  traerLogo(): Observable<any>{
    return this.http.get(`${this.appUrl}api/home-logo/`)
  }
  actualizarLogo(id: any, file: any): Observable<any>{
    this.uploadImage(file);
    return this.image.pipe(
      map(res=> file = {url: res} ),
      switchMap(()=>this.http.patch<any>(`${this.appUrl}api/home-logo/${id}`, file))
    ).pipe(take(1))
  }

  traerTextos(): Observable<any>{
    return this.http.get(`${this.appUrl}api/home-texto/`)
  }

  guardarTexto(datos: any, id: any): Observable<any>{
    return this.http.patch(`${this.appUrl}api/home-texto/${id}`, datos)
  }
  traerImagenes(): Observable<any>{
    return this.http.get(`${this.appUrl}api/home-imagen/`)
  }

  sendImagen(f: any): Observable<any>{
    this.uploadImage(f);
    let file: any;
    return this.image.pipe(
      map(res=> file = {url: res} ),
      switchMap(()=>this.http.post<any>(`${this.appUrl}api/home-imagen/`, file))
    ).pipe(take(1))
  }

  actualizarImagen(f: any, id: any): Observable<any>{
    this.uploadImage(f);
    let file: any;
    return this.image.pipe(
      map(res=> file = {url: res} ),
      switchMap(()=>this.http.patch<any>(`${this.appUrl}api/home-imagen/${id}`, file))
    ).pipe(take(1))
  }

  //Promociones

  traerPromos(): Observable<any>{
    return this.http.get(`${this.appUrl}api/home-promocion/`)
  }
  actualizarPromo(datos: any, f: any, id: any): Observable<any>{
    this.uploadImage(f);
    let img: any;
    return this.image.pipe(
      map(res => img = res),
      switchMap(()=>this.http.patch<any>(`${this.appUrl}api/home-promocion/${id}`, {
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        img,
        precio: datos.precio
      }))
    ).pipe(take(1))
  }
  //------------------------//
  
  
  traerProductos(page: number): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.appUrl}api/producto/${page}`)
  }

  traerProductosPorCategoria(page: number, categoria: string): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.appUrl}api/producto/${categoria}/${page}`)
  }

  sendProduct(prod: Producto, imagen: any): Observable<any>{
    this.uploadImage(imagen);
    return this.image.pipe(
      map((res: any)=>prod.imagen = res),
      mergeMap(()=> this.http.post<any>(`${this.appUrl}api/producto/`, prod))
    ).pipe(take(1))
  }

  private uploadImage(image: any){
    this.uiServ.show()
    this.filePath = `images/${image.name}`;
    const fileRef = ref(this.storage, this.filePath);
    uploadBytes(fileRef, image)
    .then(async (res)=>{
      const urlImg = await getDownloadURL(res.ref);
      this.image.next(urlImg)
    })
    .catch(error=> console.log(error))
  }

  editProducto(producto: any, id: string, img: any):Observable<any>{
    if (img) {
      this.uploadImage(img);
      return this.image.pipe(
        map(res => producto.imagen = res),
        mergeMap(()=> this.http.patch<any>(`${this.appUrl}api/producto/${id}`, producto))
      ).pipe(take(1))
    } else {
      return this.http.patch<any>(`${this.appUrl}api/producto/${id}`, producto)
    }
  }

  eliminarProducto(id: string): Observable<any>{
    return this.http.delete<any>(`${this.appUrl}api/producto/${id}`)
  }

  traerDatos(): Observable<any>{
    return this.http.get(`${this.appUrl}api/home-datos/`)
  }

  actualizarDatos(id: any, datos: any): Observable<any>{
    return this.http.patch(`${this.appUrl}api/home-datos/${id}`, datos)
  }
}
