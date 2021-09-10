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
