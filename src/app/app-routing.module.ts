import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/encuesta',
    pathMatch: 'full'
  },
  {
    path: 'encuesta', component: EncuestaComponent,
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
