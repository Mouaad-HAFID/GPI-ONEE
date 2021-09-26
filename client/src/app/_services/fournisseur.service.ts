import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../_models/fournisseur';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.host}/fournisseurs`);
  }
  getFournisseurById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.host}/fournisseurs/${id}`);
  }
  addFournisseur(data: any): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.host}/fournisseurs/`, data);
  }
}
