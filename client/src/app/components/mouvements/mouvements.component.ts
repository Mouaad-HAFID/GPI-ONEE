import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Equipement } from 'src/app/_models/equipement';
import { Mouvement } from 'src/app/_models/mouvement';
import { AgentService } from 'src/app/_services/agent.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { MouvementService } from 'src/app/_services/mouvement.service';

@Component({
  selector: 'app-mouvements',
  templateUrl: './mouvements.component.html',
  styleUrls: ['./mouvements.component.css'],
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
export class MouvementsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'numeroMvt',
    'typeMouvement',
    'dateMouvement',
    'dateFinMouvement',
    'agent',
    'listeEquipements',
  ];
  dataSource: MatTableDataSource<Mouvement[]>;
  Equipements: Equipement[];
  mouvements: any;
  value: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private mouvementService: MouvementService,
    private agentService: AgentService,
    private equipementService: EquipementService
  ) {}

  ngOnInit(): void {
    this.onInitTab();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource<Mouvement[]>(this.mouvements);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onInitTab() {
    this.mouvementService.getAllMouvements().subscribe((res) => {
      this.mouvements = res;
      console.log(this.mouvements);
      this.mouvements.forEach((m) => {
        if (m.demandeur !== null)
          m.agent = `${m.demandeur.matricule} - ${m.demandeur.nom} ${m.demandeur.prenom}`;
        else m.agent = 'N/A';
        m.dateMouvement = new Date(m.dateMouvement).toLocaleString();
        if (m.dateFinMouvement === null) m.dateFinMouvement = 'N/A';
        else m.dateFinMouvement = new Date(m.dateFinMouvement).toLocaleString();
      });

      this.dataSource = new MatTableDataSource<Mouvement[]>(this.mouvements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
