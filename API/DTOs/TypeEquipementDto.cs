using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class TypeEquipementDto
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        //?Relations
        public ICollection<GammeDto> Gammes { get; set; }
        public ICollection<EquipementDto> Equipement { get; set; }
        public int TypeId { get; set; }
    }
}