import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mouvement } from '../_models/mouvement';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  generateDoc(data: any): Observable<Mouvement> {
    return this.http.post<Mouvement>(`${this.host}/docs`, data);
  }
}
