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
import { Router } from '@angular/router';
import { Equipement } from 'src/app/_models/equipement';
import { AgentService } from 'src/app/_services/agent.service';
import { DirectionService } from 'src/app/_services/direction.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { GammeService } from 'src/app/_services/gamme.service';
import { InventaireService } from 'src/app/_services/inventaire.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-equipements-tab',
  templateUrl: './equipements-tab.component.html',
  styleUrls: ['./equipements-tab.component.css'],
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
export class EquipementsTabComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'serie',
    'codeONE',
    'type',
    'gamme',
    'codeContrat',
    'etat',
  ];
  dataSource: MatTableDataSource<Equipement[]>;
  expandedElement: Equipement | null;
  value: string;
  editElement;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  equipements: any;
  constructor(
    private equipementservice: EquipementService,
    private typeService: TypeEquipementService,
    private gammeService: GammeService,
    private inventaireService: InventaireService,
    private agentService: AgentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onGetAllEquipements();
  }

  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource<Equipement[]>(this.equipements);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGetAllEquipements(): void {
    this.equipementservice.getAllEquipements().subscribe((res) => {
      this.equipements = res;
      this.dataSource = new MatTableDataSource<Equipement[]>(this.equipements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSourceConstruct();
    });
  }

  dataSourceConstruct() {
    let data = this.equipements;
    data.forEach((d) => {
      this.typeService
        .getTypeById(d.typeEquipementId)
        .subscribe((res) => (d.type = res.nom));
      this.gammeService
        .getGammeById(d.gammeId)
        .subscribe((res) => (d.gamme = res.code));
      d.etat = d.etat.abrev;
    });
    console.log(data);
  }
  onEdit(element) {
    console.log(element);
    this.router.navigateByUrl(`/admin/equipements/edit/${element.id}`);
  }
}
