import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { Observable } from 'rxjs/Observable';
import { ReserverVehicule } from '../../domain/ReserverVehicule';
import { Collaborateur } from '../../domain/Collaborateur';

@Component({
  selector: 'app-reser-vehicule',
  templateUrl: './reser-vehicule.component.html',
  styleUrls: ['./reser-vehicule.component.css']
})
export class ReserVehiculeComponent implements OnInit {
  dateDepart;
  dateRetour;
  heureDepart;
  heureRetour;
  reservation: ReserverVehicule;
  vehiculesDispos: VehiculeSociete[];

  constructor(private dataSvc: DataService, private modalService: NgbModal) {
    this.dataSvc.vehiculesDisponibles.subscribe(
      reserv => (this.vehiculesDispos = reserv)
    );
  }

  ngOnInit() {}

  reserver(vehicule: VehiculeSociete) {
    this.reservation = new ReserverVehicule(new Date(), new Date());

    this.reservation.dateReservation = new Date(
      this.dateDepart['year'],
      this.dateDepart['month'] - 1,
      this.dateDepart['day'],
      this.heureDepart['hour'],
      this.heureDepart['minute']
    );
    this.reservation.dateRetour = new Date(
      this.dateRetour['year'],
      this.dateRetour['month'] - 1,
      this.dateRetour['day'],
      this.heureRetour['hour'],
      this.heureRetour['minute']
    );

    this.reservation.vehicule = vehicule;

    console.log(this.reservation.vehicule);
  }
}