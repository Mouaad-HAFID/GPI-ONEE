import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Equipement } from '../_models/equipement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipementService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.host}/equipements`);
  }
}
