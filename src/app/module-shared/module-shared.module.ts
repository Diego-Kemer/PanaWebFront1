import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormContactoComponent } from './components/form-contacto/form-contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    FormContactoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    FormContactoComponent
  ]
})
export class ModuleSharedModule { }
