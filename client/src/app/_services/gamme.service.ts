import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gamme } from '../_models/gamme';

@Injectable({
  providedIn: 'root',
})
export class GammeService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllGammes(): Observable<Gamme[]> {
    return this.http.get<Gamme[]>(`${this.host}/gammes`);
  }
  getGammeById(id: number): Observable<Gamme> {
    return this.http.get<Gamme>(`${this.host}/gammes/${id}`);
  }
  addGamme(data: any): Observable<Gamme> {
    return this.http.post<Gamme>(`${this.host}/gammes`, data);
  }
}
