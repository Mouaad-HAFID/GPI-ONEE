using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Equipements")]
    public class Equipement
    {
        //?Props
        public int Id { get; set; }
        public int Serie { get; set; }
        public string CodeONE { get; set; }
        public int CodeContrat { get; set; }
        public string SerieConstructeur { get; set; }

        //?Relations

        public int? AgentId { get; set; } = null;
        public virtual Agent Agent { get; set; }
        public int? InventaireId { get; set; } = null;
        public virtual Inventaire Inventaire { get; set; }
        public TypeEquipement TypeEquipement { get; set; }
        public int TypeEquipementId { get; set; }
        public Gamme Gamme { get; set; }
        public int GammeId { get; set; }
        public Fournisseur Fournisseur { get; set; }
        public int FournisseurId { get; set; }
        public Etat Etat { get; set; }
        public int? EtatId { get; set; } = null;
        public Contrat Contrat { get; set; }
        public int? ContratId { get; set; } = null;
        public List<Equipement_Mouvement> Equipement_Mouvements { get; set; }
    }
}