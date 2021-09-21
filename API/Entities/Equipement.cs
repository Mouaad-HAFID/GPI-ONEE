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

        //?Relations

        public int? AgentId { get; set; } = null;
        public virtual Agent Agent { get; set; }
        public int? InventaireId { get; set; } = null;
        public virtual Inventaire Inventaire { get; set; }
        public ICollection<Mouvement> Mouvements { get; set; }
        public TypeEquipement TypeEquipement { get; set; }
        public int TypeEquipementId { get; set; }
        public Gamme Gamme { get; set; }
        public int GammeId { get; set; }
        public Fournisseur Fournisseur { get; set; }
        public int FournisseurId { get; set; }

    }
}