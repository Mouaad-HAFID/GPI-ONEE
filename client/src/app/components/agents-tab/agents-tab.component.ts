import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgentDataSource } from 'src/app/_datasources/agent.datasource';
import { Agent } from 'src/app/_models/agent';
import { Equipement } from 'src/app/_models/equipement';
import { AgentService } from 'src/app/_services/agent.service';

@Component({
  selector: 'app-agents-tab',
  templateUrl: './agents-tab.component.html',
  styleUrls: ['./agents-tab.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AgentsTabComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['matricule', 'nom', 'dr'];
  dataSource: MatTableDataSource<Agent[]>;
  expandedElement: Agent | null;
  Equipements: Equipement[];
  value: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  agents: any;
  constructor(private agentservice: AgentService) {
    console.log(this.agents);
  }

  ngOnInit() {
    this.onGetAllAgents();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource<Agent[]>(this.agents);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onGetAllAgents(): void {
    this.agentservice.getAllAgents().subscribe((res) => {
      this.agents = res;
      this.dataSource = new MatTableDataSource<Agent[]>(this.agents);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
