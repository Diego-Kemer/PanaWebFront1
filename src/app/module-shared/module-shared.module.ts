import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormContactoComponent } from './components/form-contacto/form-contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    FormContactoComponent,
    FormProductoComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    FormContactoComponent,
    FormProductoComponent,
    LogoComponent
  ]
})
export class ModuleSharedModule { }
