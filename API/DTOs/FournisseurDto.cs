using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class FournisseurDto
    {
        public int Id { get; set; }
        public string CodeFournisseur { get; set; }
        public ICollection<EquipementDto> Equipements { get; set; }
        public ICollection<Contrat> Contrats { get; set; }
    }
}