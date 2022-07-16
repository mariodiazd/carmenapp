import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JuegoComponent } from './pages/juego/juego.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'juego', component: JuegoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
