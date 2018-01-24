import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WrapperCollaborateurComponent } from './wrapper-collaborateur/wrapper-collaborateur.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { patch } from 'webdriver-js-extender';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbAccordion, NgbPanel } from '@ng-bootstrap/ng-bootstrap';

import { DetailCovoiturageComponent } from './detail-covoiturage/detail-covoiturage.component';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { CreerReservationComponent } from './creer-reservation/creer-reservation.component';

const collabRoutes: Routes = [
  {
    path: '',
    component: WrapperCollaborateurComponent,
    children: [
      { path: 'annonces', component: AnnoncesComponent },
      {
        path: 'reservations',
        component: ReservationsComponent
      },
      { path: 'reservations/creer', component: CreerReservationComponent },
      { path: 'annonces/creer', component: CreerAnnonceComponent },
      { path: '', redirectTo: 'reservations' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(collabRoutes),
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    WrapperCollaborateurComponent,
    ReservationsComponent,
    AnnoncesComponent,
    CreerReservationComponent,
    CreerAnnonceComponent,
    ListeAnnoncesComponent,
    DetailCovoiturageComponent
  ],
  providers: [NgbAccordion, NgbPanel],
  entryComponents: [DetailCovoiturageComponent]
})
export class CollaborateurModule {}
