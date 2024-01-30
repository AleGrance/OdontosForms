import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { SatisfaccionComponent } from './pages/satisfaccion/satisfaccion.component';
import { HttpClientModule } from '@angular/common/http';
import { GraciasComponent } from './pages/gracias/gracias.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    AuditoriaComponent,
    SatisfaccionComponent,
    GraciasComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
