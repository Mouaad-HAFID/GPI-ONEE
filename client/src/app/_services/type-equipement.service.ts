import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeEquipement } from '../_models/typeEquipement';

@Injectable({
  providedIn: 'root',
})
export class TypeEquipementService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllTypes(): Observable<TypeEquipement[]> {
    return this.http.get<TypeEquipement[]>(`${this.host}/types`);
  }
}
