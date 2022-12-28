import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ref, Storage, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL } from '@firebase/storage';
import { map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../modelo/producto';


@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  private filePath: any;
  @Output() image = new EventEmitter;
  private appUrl: string = environment.apiUrl;

  constructor( private storage: Storage,
                private http: HttpClient) { }

  
  traerProductos(page: number): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.appUrl}api/producto/${page}`)
  }

  traerProductosPorCategoria(page: number, categoria: string): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.appUrl}api/producto/${categoria}/${page}`)
  }

  sendProduct(prod: Producto, imagen: any){
    this.uploadImage(imagen);
    this.image.pipe(
      map((res: any)=>prod.imagen = res),
      mergeMap(()=> this.http.post<any>(`${this.appUrl}api/producto/`, prod))
    ).subscribe(r=>{
      console.log(r)
    })    
  }

  private uploadImage(image: any){
    this.filePath = `images/${image.name}`;
    const fileRef = ref(this.storage, this.filePath);
    uploadBytes(fileRef, image)
    .then(async (res)=>{
      const urlImg = await getDownloadURL(res.ref);
      this.image.next(urlImg)
    })
    .catch(error=> console.log(error))
  }
}
