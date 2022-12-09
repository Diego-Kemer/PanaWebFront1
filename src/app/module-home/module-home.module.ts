import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleHomeRoutingModule } from './module-home-routing.module';
import { ModuleSharedModule } from '../module-shared/module-shared.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { HeaderComponent } from './components/principal/header/header.component';
import { AboutComponent } from './components/principal/about/about.component';
import { PromocionComponent } from './components/principal/promocion/promocion.component';
import { VideoComponent } from './components/principal/video/video.component';
import { MapaComponent } from './components/principal/mapa/mapa.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    HeaderComponent,
    AboutComponent,
    PromocionComponent,
    VideoComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    ModuleHomeRoutingModule,
    ModuleSharedModule
  ]
})
export class ModuleHomeModule { }
