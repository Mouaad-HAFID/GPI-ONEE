import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mouvement } from '../_models/mouvement';

@Injectable({
  providedIn: 'root',
})
export class MouvementService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllMouvements(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(`${this.host}/mouvements`);
  }
  getMouvementById(id: number): Observable<Mouvement> {
    return this.http.get<Mouvement>(`${this.host}/mouvements/${id}`);
  }
  addMouvement(data: Mouvement): Observable<Mouvement> {
    return this.http.post<Mouvement>(`${this.host}/mouvements`, data);
  }
  getLastMouvement(): Observable<Mouvement> {
    return this.http.get<Mouvement>(`${this.host}/mouvements/last`);
  }
}
