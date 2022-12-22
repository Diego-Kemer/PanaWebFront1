import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', loadChildren: ()=> import('./module-home/module-home.module').then(m => m.ModuleHomeModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'productos', loadChildren: ()=> import('./module-productos/module-productos.module').then(m => m.ModuleProductosModule)},
  {path: 'admin', loadChildren: ()=> import('./module-panel/module-panel.module').then(m => m.ModulePanelModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
