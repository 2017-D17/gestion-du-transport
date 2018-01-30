import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';

import { ReservationVehicule } from '../domain/ReservationVehicule';

@Injectable()
export class DataService {
  private _confirmRace = new BehaviorSubject<ReservationVehicule[]>([]);
  private _myRaces = new BehaviorSubject<ReservationVehicule[]>([]);

  get confirmRace(): Observable<ReservationVehicule[]> {
    return this._confirmRace.asObservable();
  }

  get myRaces(): Observable<ReservationVehicule[]> {
    return this._myRaces.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchToConfirmRaces(): Observable<ReservationVehicule[]> {
    const url = `${environment.endpoint}/chauffeur`;
    return this.http.get<ReservationVehicule[]>(url).do(races => {
      races.map(resa => {
        resa.toConfirm = true;
        return resa;
      });
      this._confirmRace.next(races);
    });
  }

  fetchMyRaces(): Observable<ReservationVehicule[]> {
    const url = `${environment.endpoint}/chauffeur/me`;
    return this.http.get<ReservationVehicule[]>(url).do(races => {
      races.map(resa => {
        resa.toConfirm = false;
        return resa;
      });
      this._myRaces.next(races);
    });
  }
}
