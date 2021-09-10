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
import { Equipement } from 'src/app/_models/equipement';
import { EquipementService } from 'src/app/_services/equipement.service';

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
  displayedColumns: string[] = ['id', 'nom', 'type'];
  dataSource: MatTableDataSource<Equipement[]>;
  expandedElement: Equipement | null;
  value: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  equipements: any;
  constructor(private equipementservice: EquipementService) {}

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
    });
  }
}
