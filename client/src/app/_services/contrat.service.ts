import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contrat } from '../_models/contrat';

@Injectable({
  providedIn: 'root',
})
export class ContratService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.host}/contrats`);
  }
  addContrat(data: any): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.host}/contrats`, data);
  }
}
