import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ModuleSharedModule } from './module-shared/module-shared.module';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        HttpClientModule,
        ModuleSharedModule
    ]
})
export class AppModule { }
