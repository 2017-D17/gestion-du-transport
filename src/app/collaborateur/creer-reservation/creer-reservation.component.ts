import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Annonce } from '../../shared/domain/annonce';
import { AnnonceService } from '../../shared/services/annonce.service';
import { environment } from '../../../environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-creer-reservation',
  templateUrl: './creer-reservation.component.html',
  styleUrls: ['./creer-reservation.component.css']
})
export class CreerReservationComponent implements OnInit {
  annonces: Annonce[];
  annonce: Annonce = null;

  filterField1: FormControl = new FormControl();
  filterField2: FormControl = new FormControl();
  filterField3: FormControl = new FormControl();
  filtreAdrDep: string;
  filtreAdrAr: string;
  filtreDateAr: Date;

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
    this.filterField1.valueChanges.subscribe(val => {
      this.filtreAdrDep = val;
    });
    this.filterField2.valueChanges.subscribe(val => {
      this.filtreAdrAr = val;
    });
    this.filterField3.valueChanges.subscribe(val => {
      this.filtreDateAr = val;
    });
  }

  setAdrDep(valeurAdresseDep) {
    console.log(valeurAdresseDep);
    this.annonceService.setFiltre(valeurAdresseDep);
  }

  open(content) {
    this.modalService.open(content);
  }
  saveBooking(annonce: Annonce) {
    this.annonceService.bookAnnonce(annonce).subscribe();
  }
}
