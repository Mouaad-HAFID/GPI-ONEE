using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Equipements")]
    public class Equipement
    {
        //?Props
        public int Id { get; set; }
        public string Nom { get; set; }

        //?Relations
        public Agent Agent { get; set; }
        public int AgentId { get; set; }
        public Inventaire Inventaire { get; set; }
        public int InventaireId { get; set; }
        public Mouvement Mouvement { get; set; }
        public int MouvementId { get; set; }
        public TypeEquipement TypeEquipement { get; set; }
        public int TypeEquipementId { get; set; }
        public Gamme Gamme { get; set; }
        public int GammeId { get; set; }
        public Fournisseur Fournisseur { get; set; }
        public int FournisseurId { get; set; }
    }
}