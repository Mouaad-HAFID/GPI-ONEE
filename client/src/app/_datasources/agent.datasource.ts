import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agent } from '../_models/agent';
import { AgentService } from '../_services/agent.service';

export class AgentDataSource implements DataSource<Agent> {
  private AgentSubject = new BehaviorSubject<Agent[]>([]);
  constructor(private agentservice: AgentService) {}
  connect(collectionViewer: CollectionViewer): Observable<Agent[]> {
    return this.AgentSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.AgentSubject.complete();
  }

  loadAgents() {
    this.agentservice
      .getAllAgents()
      .subscribe((agents) => this.AgentSubject.next(agents));
  }
}
