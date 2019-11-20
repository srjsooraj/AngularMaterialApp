import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MaterialsModule } from './materials.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './routing/home.component';
import { ParticipantComponent } from './routing/participant.component';
import { SearchparticipantComponent } from './routing/searchparticipant.component';
import { ParticipantListComponent } from './routing/participantlist.component';
import { ParticipantDetailsComponent } from './routing/participant-details.component';
import { DialogBoxComponent } from './routing/dialog-box.component';

const appPath : Routes = [
  { path : 'home', component : HomeComponent },
  { path : 'register', component : ParticipantComponent },
  { path : 'search' , component : SearchparticipantComponent},
  { path : 'list' , component : ParticipantListComponent},
  { path : 'participant/:participantId' , component : ParticipantDetailsComponent},
  { path: '', redirectTo : '/home', pathMatch : 'full' },
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParticipantComponent,
    SearchparticipantComponent,
    ParticipantListComponent,
    ParticipantDetailsComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    HttpClientModule,
    RouterModule.forRoot(appPath)
  ],
  providers: [],
  entryComponents: [DialogBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
