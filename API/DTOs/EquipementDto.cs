using API.Entities;

namespace API.DTOs
{
    public class EquipementDto
    {
        //?Props
        public int Id { get; set; }
        public string Nom { get; set; }

        //?Relations
        public int AgentId { get; set; }
        public int InventaireId { get; set; }
        public int MouvementId { get; set; }
        public int TypeEquipementId { get; set; }
        public int GammeId { get; set; }
        public FournisseurDto Fournisseur { get; set; }
        public int FournisseurId { get; set; }
    }
}