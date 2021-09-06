import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Direction } from '../_models/direction';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllDirections(): Observable<Direction[]> {
    return this.http.get<Direction[]>(`${this.host}/directions`);
  }
}
