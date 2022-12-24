import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductoComponent } from './components/add-producto/add-producto.component';
import { EditProductoComponent } from './components/edit-producto/edit-producto.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent, children: [
    {path: 'addProd', component: AddProductoComponent},
    {path: 'edit', component: EditProductoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulePanelRoutingModule { }
