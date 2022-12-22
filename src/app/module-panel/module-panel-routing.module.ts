import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductoComponent } from '../module-shared/components/form-producto/form-producto.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent, children: [
    {path: 'addProd', component: FormProductoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulePanelRoutingModule { }
