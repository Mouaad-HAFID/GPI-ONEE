using System.Collections.Generic;

namespace API.DTOs
{
    public class DirectionDto
    {
        public int Id { get; set; }
        public string CodeDirection { get; set; }
        public InventaireDto Inventaire { get; set; }
        public int InventaireId { get; set; }
    }
}