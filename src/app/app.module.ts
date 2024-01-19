import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { FormsModule } from '@angular/forms';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';

@NgModule({
  declarations: [
    AppComponent,
    EncuestaComponent,
    AuditoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
