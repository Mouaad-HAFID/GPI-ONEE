import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipementService } from 'src/app/_services/equipement.service';
import { MouvementService } from 'src/app/_services/mouvement.service';

@Component({
  selector: 'app-fiche-mouvement',
  templateUrl: './fiche-mouvement.component.html',
  styleUrls: ['./fiche-mouvement.component.css'],
})
export class FicheMouvementComponent implements OnInit {
  mouvement: any;
  equipements: any = [];
  constructor(
    private mouvementService: MouvementService,
    private equipementService: EquipementService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) =>
      this.mouvementService.getMouvementById(params.id).subscribe((res) => {
        this.mouvement = res;
        if (this.mouvement.demandeur === null) {
          this.mouvement.demandeur = {};
          this.mouvement.demandeur.nom = 'N/A';
          this.mouvement.demandeur.matricule = 'N/A';
          this.mouvement.demandeur.domainePerso = 'N/A';
        }
        let _equipementsId = this.mouvement.equipementsId;
        _equipementsId.forEach((id) => {
          this.equipementService
            .getEquipementById(id)
            .subscribe((res) => this.equipements.push(res));
        });
        console.log(this.equipements);
      })
    );
  }
}
