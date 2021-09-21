using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class GammeDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Caracteristiques { get; set; }
        public TypeEquipementDto Type { get; set; }
        public int TypeId { get; set; }
        public ICollection<EquipementDto> Equipements { get; set; }
    }
}