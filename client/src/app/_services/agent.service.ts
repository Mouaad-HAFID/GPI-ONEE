import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agent } from '../_models/agent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  host = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.host}/agents`);
  }
}
