import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { GameScreenComponent } from './game-screen/game-screen/game-screen.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'game', component: GameScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
