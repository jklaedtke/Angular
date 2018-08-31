import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CandidateListComponent } from './candidates/candidate-list.component';
import { CandidateDetailComponent } from './candidates/candidate-detail.component';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    CandidateDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "candidates", component: CandidateListComponent},
      {path: "candidates/:id", component: CandidateDetailComponent},
      {path: "welcome", component: WelcomeComponent},
      {path: "", redirectTo: "welcome", pathMatch: "full"},
      {path: "**", redirectTo: "welcome", pathMatch: "full"}
    ], {useHash: true})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
