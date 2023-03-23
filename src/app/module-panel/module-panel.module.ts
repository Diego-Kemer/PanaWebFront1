import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulePanelRoutingModule } from './module-panel-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { ModuleSharedModule } from '../module-shared/module-shared.module';
import { EditProductoComponent } from './components/edit-producto/edit-producto.component';
import { AddProductoComponent } from './components/add-producto/add-producto.component';
import { EditHomeComponent } from './components/edit-home/edit-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrincipalComponent,
    NavAdminComponent,
    EditProductoComponent,
    AddProductoComponent,
    EditHomeComponent
  ],
  imports: [
    CommonModule,
    ModulePanelRoutingModule,
    ModuleSharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModulePanelModule { }
