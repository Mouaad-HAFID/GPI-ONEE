import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventaire } from '../_models/inventaire';

@Injectable({
  providedIn: 'root',
})
export class InventaireService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllInventaires(): Observable<Inventaire[]> {
    return this.http.get<Inventaire[]>(`${this.host}/inventaires`);
  }
}
