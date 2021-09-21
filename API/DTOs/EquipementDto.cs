using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class EquipementDto
    {
        //?Props
        public int Id { get; set; }
        public int Serie { get; set; }
        public string CodeONE { get; set; }
        public int CodeContrat { get; set; }

        //?Relations
        public AgentDto Agent { get; set; }
        public int? AgentId { get; set; } = null;
        public int? InventaireId { get; set; } = null;
        public ICollection<MouvementDto> Mouvements { get; set; }
        public int TypeEquipementId { get; set; }
        public int GammeId { get; set; }
        public FournisseurDto Fournisseur { get; set; }
        public int FournisseurId { get; set; }
        // public ContratDto Contrat { get; set; }

    }
}