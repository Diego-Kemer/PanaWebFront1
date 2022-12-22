import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulePanelRoutingModule } from './module-panel-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { ModuleSharedModule } from '../module-shared/module-shared.module';


@NgModule({
  declarations: [
    PrincipalComponent,
    DetallesComponent,
    NavAdminComponent
  ],
  imports: [
    CommonModule,
    ModulePanelRoutingModule,
    ModuleSharedModule
  ]
})
export class ModulePanelModule { }
