import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SatisfaccionComponent } from './pages/satisfaccion/satisfaccion.component';
import { GraciasComponent } from './pages/gracias/gracias.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { ReporteAuditoriaComponent } from './pages/reporte-auditoria/reporte-auditoria.component';
import { ReporteSatisfaccionComponent } from './pages/reporte-satisfaccion/reporte-satisfaccion.component';

const routes: Routes = [
  {
    path: 'bienvenida/:nrodoc',
    redirectTo: '/bienvenida/:nrodoc',
    pathMatch: 'full'
  },
  {
    path: 'bienvenida/:nrodoc', component: AuditoriaComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'satisfaccion/:codtrn', component: SatisfaccionComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'agradecimiento', component: GraciasComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'reporte-auditoria', component: ReporteAuditoriaComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'reporte-satisfaccion', component: ReporteSatisfaccionComponent,
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
