import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleProductosRoutingModule } from './module-productos-routing.module';
import { ModuleSharedModule } from '../module-shared/module-shared.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductoComponent } from './components/principal/producto/producto.component';
import { BuscadorComponent } from './components/principal/buscador/buscador.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    ProductoComponent,
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    ModuleProductosRoutingModule,
    ModuleSharedModule
  ]
})
export class ModuleProductosModule { }
