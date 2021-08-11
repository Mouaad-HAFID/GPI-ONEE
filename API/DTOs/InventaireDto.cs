using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class InventaireDto
    {
        public int Id { get; set; }
        //?Relations
        public DirectionDto Direction { get; set; }
        public int DirectionId { get; set; }
        public ICollection<EquipementDto> Equipements { get; set; }
    }
}