import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CardComponent } from './components/card/card.component';
import { AgentsTabComponent } from './components/agents-tab/agents-tab.component';
import { EquipementsTabComponent } from './components/equipements-tab/equipements-tab.component';
import { AgentsExpansionComponent } from './components/agents-expansion/agents-expansion.component';
import { EquipementsExpansionComponent } from './components/equipements-expansion/equipements-expansion.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { AffectationDirComponent } from './components/affectation-dir/affectation-dir.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AffectationAgentComponent } from './components/affectation-agent/affectation-agent.component';
import { TypesComponent } from './components/types/types.component';
import { AddGammeComponent } from './components/addgamme/addgamme.component';
import { SaisieComponent } from './components/saisie/saisie.component';
import { MouvementsComponent } from './components/mouvements/mouvements.component';
import { MouvementsExpansionComponent } from './components/mouvements-expansion/mouvements-expansion.component';
import { SearchPipe } from './_pipes/search.pipe';
import { SearchAgentMatPipe } from './_pipes/search-agent-mat.pipe';
import { AddEquipementComponent } from './components/add-equipement/add-equipement.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { ImportAgentsComponent } from './components/import-agents/import-agents.component';
import { ImportEquipementsComponent } from './components/import-equipements/import-equipements.component';
import { RestitutionComponent } from './components/restitution/restitution.component';
import { PretComponent } from './components/pret/pret.component';
import { EquipementFilterPipe } from './_pipes/equipement-filter.pipe';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { ImportEtatsComponent } from './components/import-etats/import-etats.component';
import { ImportFournisseursComponent } from './components/import-fournisseurs/import-fournisseurs.component';
import { ImportContratsComponent } from './components/import-contrats/import-contrats.component';
import { EditEquipementComponent } from './components/edit-equipement/edit-equipement.component';
import { FicheMouvementComponent } from './components/fiche-mouvement/fiche-mouvement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolbarComponent,
    CardComponent,
    AgentsTabComponent,
    EquipementsTabComponent,
    AgentsExpansionComponent,
    EquipementsExpansionComponent,
    AffectationComponent,
    AffectationDirComponent,
    CreateAccountComponent,
    AffectationAgentComponent,
    TypesComponent,
    AddGammeComponent,
    SaisieComponent,
    MouvementsComponent,
    MouvementsExpansionComponent,
    SearchPipe,
    SearchAgentMatPipe,
    AddEquipementComponent,
    GestionComponent,
    ImportAgentsComponent,
    ImportEquipementsComponent,
    RestitutionComponent,
    PretComponent,
    EquipementFilterPipe,
    AddTypeComponent,
    ImportEtatsComponent,
    ImportFournisseursComponent,
    ImportContratsComponent,
    EditEquipementComponent,
    FicheMouvementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
