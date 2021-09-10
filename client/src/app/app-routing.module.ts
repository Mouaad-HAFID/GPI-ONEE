import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectationComponent } from './components/affectation/affectation.component';
import { AgentsTabComponent } from './components/agents-tab/agents-tab.component';
import { EquipementsTabComponent } from './components/equipements-tab/equipements-tab.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: ToolbarComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'agents', component: AgentsTabComponent },
      { path: 'equipements', component: EquipementsTabComponent },
      { path: 'affectation', component: AffectationComponent },
    ] /*canActivate: [AuthGuard]*/,
  },

  { path: '**', component: HomeComponent /*canActivate: [AuthGuard]*/ },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
