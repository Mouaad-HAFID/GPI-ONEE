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
}
