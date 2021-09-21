using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MouvementDto
    {
        //?Props
        public int Id { get; set; }
        public int NumeroMvt { get; set; }
        public string TypeMouvement { get; set; }
        public DateTime DateMouvement { get; set; } = DateTime.Now;
        public DateTime? DateFinMouvement { get; set; } = DateTime.Now;
        public string ListeEquipements { get; set; }
        //?Relations

        public AgentDto Demandeur { get; set; }
        public int? DemandeurId { get; set; } = null;
        public ICollection<EquipementDto> Equipements { get; set; }
    }
}