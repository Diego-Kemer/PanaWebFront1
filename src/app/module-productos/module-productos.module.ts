import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleProductosRoutingModule } from './module-productos-routing.module';
import { ModuleSharedModule } from '../module-shared/module-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModuleProductosRoutingModule,
    ModuleSharedModule
  ]
})
export class ModuleProductosModule { }
