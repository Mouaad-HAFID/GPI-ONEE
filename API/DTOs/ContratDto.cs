using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ContratDto
    {
        public int Id { get; set; }
        public int NumeroContrat { get; set; }
        public DateTime Date1 { get; set; } = DateTime.Now;
        public DateTime Date2 { get; set; } = DateTime.Now;
        public DateTime Date3 { get; set; } = DateTime.Now;

        public FournisseurDto Fournisseur { get; set; }
        public int FournisseurId { get; set; }

        public ICollection<EquipementDto> Equipements { get; set; }
    }
}