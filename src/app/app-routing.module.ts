import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SatisfaccionComponent } from './pages/satisfaccion/satisfaccion.component';
import { GraciasComponent } from './pages/gracias/gracias.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/encuesta/:param',
  //   pathMatch: 'full'
  // },
  {
    path: 'satisfaccion/:codtrn', component: SatisfaccionComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'agradecimiento', component: GraciasComponent,
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
