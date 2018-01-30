import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Annonce } from '../domain/Annonce';
import { ReserverVehicule } from '../domain/ReserverVehicule';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { VehiculeSociete } from '../domain/VehiculeSociete';

@Injectable()
export class DataService {
  private _myAnnonces = new BehaviorSubject<Annonce[]>([]);
  private _myReservations = new BehaviorSubject<Annonce[]>([]);
  private _covoitsDisponibles = new BehaviorSubject<Annonce[]>([]);
  private _myReservationsSoc = new BehaviorSubject<ReserverVehicule[]>([]);
  private _vehiculesDisponibles = new BehaviorSubject<ReserverVehicule[]>([]);

  get myAnnonces(): Observable<Annonce[]> {
    return this._myAnnonces.asObservable();
  }
  get myReservations(): Observable<Annonce[]> {
    return this._myReservations.asObservable();
  }
  get covoitsDisponibles(): Observable<Annonce[]> {
    return this._covoitsDisponibles.asObservable();
  }
  get myReservationsSoc(): Observable<ReserverVehicule[]> {
    return this._myReservationsSoc.asObservable();
  }
  get vehiculesDisponibles(): Observable<ReserverVehicule[]> {
    return this._vehiculesDisponibles.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchAllData() {
    return this.fetchAvailableCovoits()
      .merge(this.fetchMyAnnonces())
      .merge(this.fetchMyReservations())
      .merge(this.fetchMyReservationsSoc());
  }

  fetchMyAnnonces(): Observable<Annonce[]> {
    const url = `${environment.endpoint}/annonces/me`;
    return this.http.get<Annonce[]>(url).do(annonces => {
      this._myAnnonces.next(annonces);
      console.log('MyAnnonces fetched');
    });
  }

  fetchMyReservations(): Observable<Annonce[]> {
    const url = `${environment.endpoint}/reservations/me`;
    return this.http.get<Annonce[]>(url).do(annonces => {
      this._myReservations.next(annonces);
      console.log('MyReservations fetched');
    });
  }

  fetchMyReservationsSoc(): Observable<ReserverVehicule[]> {
    const url = `${environment.endpoint}/vehicules/me`;
    return this.http.get<ReserverVehicule[]>(url).do(reservations => {
      this._myReservationsSoc.next(reservations);
      console.log('MyReservationsSoc fetched');
    });
  }

  fetchAvailableCovoits(): Observable<Annonce[]> {
    const url = `${environment.endpoint}/reservations/available`;
    return this.http.get<Annonce[]>(url).do(annonces => {
      this._covoitsDisponibles.next(annonces);
      console.log('AvailableCovoits fetched');
    });
  }

  fetchAvailableReservSoc(): Observable<ReserverVehicule[]> {
    const url = `${environment.endpoint}/vehicules/available`;
    return this.http.get<ReserverVehicule[]>(url).do(reservations => {
      this._vehiculesDisponibles.next(reservations);
      console.log('AvailableReservSoc fetched');
    });
  }

  publishAnnonce(nouvAnnonce: Annonce) {
    return this.http
      .post<Annonce[]>(environment.endpoint + '/annonces/creer', nouvAnnonce)
      .do(ann => {
        this._myAnnonces.next(ann);
      });
  }

  getTrajetInfo(origin: string, destination: string): Observable<any> {
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination);
    return this.http.get(environment.endpoint + '/maps/directions', {
      params
    });
  }

  autocomplete(term: string): Observable<string[]> {
    return term.length < 3
      ? Observable.of([])
      : this.http.get<string[]>(
          environment.endpoint + '/maps/autocomplete/' + term
        );
  }

  bookAnnonce(annonceToBook: Annonce): Observable<Annonce[]> {
    return this.http
      .post<Annonce[]>(environment.endpoint + '/reservations/creer', {
        annonce_id: annonceToBook.id
      })
      .do(ann => {
        this._myReservations.next(ann);
        this.fetchAvailableCovoits().subscribe();
      });
  }

  cancelReservation(reservation: Annonce): Observable<Annonce[]> {
    return this.http
      .post<Annonce[]>(environment.endpoint + '/reservations/annuler', {
        annonce_id: reservation.id
      })
      .do(ann => {
        this._myReservations.next(ann);
        this.fetchAvailableCovoits().subscribe();
        this.fetchMyAnnonces().subscribe();
      });
  }

  cancelAnnonce(annonce: Annonce): Observable<Annonce[]> {
    return this.http
      .post<Annonce[]>(environment.endpoint + '/annonces/annuler', {
        annonce_id: annonce.id
      })
      .do(ann => {
        this._myAnnonces.next(ann);
        this.fetchAvailableCovoits().subscribe();
        this.fetchMyReservations().subscribe();
      });
  }
}
