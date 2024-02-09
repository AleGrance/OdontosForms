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
import { NgSelectModule } from '@ng-select/ng-select';
import { ReporteAuditoriaComponent } from './pages/reporte-auditoria/reporte-auditoria.component';
import { ReporteSatisfaccionComponent } from './pages/reporte-satisfaccion/reporte-satisfaccion.component';

@NgModule({
  declarations: [
    AppComponent,
    AuditoriaComponent,
    SatisfaccionComponent,
    GraciasComponent,
    ReporteAuditoriaComponent,
    ReporteSatisfaccionComponent
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
