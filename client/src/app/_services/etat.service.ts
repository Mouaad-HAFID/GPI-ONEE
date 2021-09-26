import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etat } from '../_models/etat';

@Injectable({
  providedIn: 'root',
})
export class EtatService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllEtats(): Observable<Etat[]> {
    return this.http.get<Etat[]>(`${this.host}/Etats`);
  }
  getEtatById(id: number): Observable<Etat> {
    return this.http.get<Etat>(`${this.host}/Etats/${id}`);
  }
  addEtat(data: Etat): Observable<Etat> {
    return this.http.post<Etat>(`${this.host}/Etats`, data);
  }
}
