using System.Collections.Generic;

namespace API.Entities
{
    public class Inventaire
    {
        //?Props
        public int Id { get; set; }
        //?Relations
        public Direction Direction { get; set; }
        public int DirectionId { get; set; }
        public ICollection<Equipement> Equipements { get; set; }
    }
}