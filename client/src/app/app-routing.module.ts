import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEquipementComponent } from './components/add-equipement/add-equipement.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { AgentsTabComponent } from './components/agents-tab/agents-tab.component';
import { EditEquipementComponent } from './components/edit-equipement/edit-equipement.component';
import { EquipementsTabComponent } from './components/equipements-tab/equipements-tab.component';
import { FicheMouvementComponent } from './components/fiche-mouvement/fiche-mouvement.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MouvementsComponent } from './components/mouvements/mouvements.component';
import { SaisieComponent } from './components/saisie/saisie.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TypesComponent } from './components/types/types.component';
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
      { path: 'equipements/edit/', redirectTo: 'equipements' },
      { path: 'equipements/edit/:id', component: EditEquipementComponent },

      { path: 'operations', component: AffectationComponent },
      { path: 'types', component: TypesComponent },
      { path: 'saisie', component: AddEquipementComponent },
      { path: 'mouvements', component: MouvementsComponent },
      { path: 'mouvements/fiche/:id', component: FicheMouvementComponent },
      { path: 'gestion', component: SaisieComponent },
    ],
    // canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
