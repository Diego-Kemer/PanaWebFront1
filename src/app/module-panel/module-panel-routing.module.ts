import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductoComponent } from './components/add-producto/add-producto.component';
import { EditHomeComponent } from './components/edit-home/edit-home.component';
import { EditProductoComponent } from './components/edit-producto/edit-producto.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent, children: [
    {path: 'addProd', component: AddProductoComponent},
    {path: 'edit', component: EditProductoComponent},
    {path: 'editHome', component: EditHomeComponent},
    {path: '', redirectTo: 'editHome', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulePanelRoutingModule { }
