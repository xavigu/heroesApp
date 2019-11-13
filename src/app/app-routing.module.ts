import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'

import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'heroe/:id', component: HeroeComponent},
  {path: '**', component: HeroesComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
     RouterModule  // Para poder usarlo en cualquier parte de la aplicación
  ] 
})
export class AppRoutingModule { }
