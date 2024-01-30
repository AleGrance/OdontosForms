import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SatisfaccionComponent } from './pages/satisfaccion/satisfaccion.component';
import { GraciasComponent } from './pages/gracias/gracias.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  {
    path: 'satisfaccion/:codtrn',
    redirectTo: '/satisfaccion/:codtrn',
    pathMatch: 'full'
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
    path: 'reporte', component: ReporteComponent,
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
