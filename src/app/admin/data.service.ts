import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { VehiculeSociete } from '../domain/VehiculeSociete';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Collaborateur } from '../domain/Collaborateur';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../domain/categorie';
import { ReservationVehicule } from '../domain/ReservationVehicule';

@Injectable()
export class DataService {
  private _vehiculesSociete = new BehaviorSubject<VehiculeSociete[]>([]);
  private _chauffeurs = new BehaviorSubject<Collaborateur[]>([]);
  private _categories = new BehaviorSubject<Categorie[]>([]);
  private _reservationsVehicule = new BehaviorSubject<ReservationVehicule[]>(
    []
  );
  private _vehiculeByImmat = new BehaviorSubject<VehiculeSociete>(null);

  filtreImmatSubject: BehaviorSubject<string> = new BehaviorSubject('');
  filtreMarqueSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  get vehiculesSociete(): Observable<VehiculeSociete[]> {
    return this._vehiculesSociete.asObservable();
  }

  get chauffeurs(): Observable<Collaborateur[]> {
    return this._chauffeurs.asObservable();
  }

  get categories(): Observable<Categorie[]> {
    return this._categories.asObservable();
  }

  get reservations(): Observable<ReservationVehicule[]> {
    return this._reservationsVehicule.asObservable();
  }

  fetchVehiculeByImmat(immat: string): Observable<VehiculeSociete> {
    return this.http
      .get<VehiculeSociete>(environment.endpoint + '/admin/vehicules/' + immat)
      .do(veh => this._vehiculeByImmat.next(veh));
  }

  fetchVehiculesSociete(): Observable<VehiculeSociete[]> {
    const url = `${environment.endpoint}/admin/vehicules`;
    return this.http.get<VehiculeSociete[]>(url).do(veh => {
      this._vehiculesSociete.next(veh);
      console.log('VehiculesSociete fetched');
    });
  }

  fetchChauffeurs(): Observable<Collaborateur[]> {
    const url = `${environment.endpoint}/admin/chauffeurs`;
    return this.http.get<Collaborateur[]>(url).do(ch => {
      this._chauffeurs.next(ch);
      console.log('Chauffeurs fetched');
    });
  }

  fetchCategories(): Observable<Categorie[]> {
    const url = `${environment.endpoint}/admin/vehicules/categories`;
    return this.http.get<Categorie[]>(url).do(cat => {
      this._categories.next(cat);
      console.log('Categories fetched');
    });
  }

  fetchReservationsDuVehicule(
    immat: string
  ): Observable<ReservationVehicule[]> {
    const url = `${environment.endpoint}/vehicules/${immat}`;
    return this.http.get<ReservationVehicule[]>(url).do(cat => {
      this._reservationsVehicule.next(cat);
      console.log(`Reservations of ${immat} fetched`);
    });
  }

  publishVehicule(newVehicule: VehiculeSociete) {
    return this.http
      .post<VehiculeSociete[]>(
        environment.endpoint + '/admin/vehicules/creer',
        newVehicule
      )
      .do(veh => {
        this._vehiculesSociete.next(veh);
      });
  }

  getFiltreImmatObservable() {
    return this.filtreImmatSubject.asObservable();
  }

  setFiltreImmat(value) {
    return this.filtreImmatSubject.next(value);
  }

  getFiltreMarqueObservable() {
    return this.filtreMarqueSubject.asObservable();
  }

  setFiltreMarque(value) {
    return this.filtreMarqueSubject.next(value);
  }
}
