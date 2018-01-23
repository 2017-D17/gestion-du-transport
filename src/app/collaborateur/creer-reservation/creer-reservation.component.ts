import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Annonce } from '../../shared/domain/annonce';
import { AnnonceService } from '../../shared/services/annonce.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-creer-reservation',
  templateUrl: './creer-reservation.component.html',
  styleUrls: ['./creer-reservation.component.css']
})
export class CreerReservationComponent implements OnInit {
  annonces: Annonce[];
  annonce: Annonce = null;
  limite: string;
  filter: string = null;
  closeResult: string;

  constructor(
    private annonceService: AnnonceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    //lister
    this.annonceService
      .listerAnnonces()
      .subscribe(annonces => (this.annonces = annonces));
  }

  setAdrDep(valeurAdresseDep: string) {
    this.filter = valeurAdresseDep;
  }
  open(content) {
    this.modalService.open(content);
  }
  saveBooking(annonce: Annonce) {
    this.annonceService.bookAnnonce(annonce).subscribe();
  }
}
