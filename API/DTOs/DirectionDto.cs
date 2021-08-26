using System.Collections.Generic;

namespace API.DTOs
{
    public class DirectionDto
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public ICollection<AgentDto> Agents { get; set; }
        public int InventaireId { get; set; }
    }
}