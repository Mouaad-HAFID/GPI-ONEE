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
        public string SerieConstructeur { get; set; }

        //?Relations
        public AgentDto Agent { get; set; }
        public int? AgentId { get; set; } = null;
        public int? InventaireId { get; set; } = null;
        public int TypeEquipementId { get; set; }
        public GammeDto Gamme { get; set; }
        public int GammeId { get; set; }
        public int FournisseurId { get; set; }
        public EtatDto Etat { get; set; }
        public int EtatId { get; set; }
        public int ContratId { get; set; }
    }
}