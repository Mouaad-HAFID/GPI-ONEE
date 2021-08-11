using System.Collections.Generic;

namespace API.Entities
{
    public class Direction
    {
        //?Props
        public int Id { get; set; }
        public string Nom { get; set; }

        //?Relations
        public ICollection<Agent> Agents { get; set; }
        public Inventaire Inventaire { get; set; }
        public Mouvement Mouvement { get; set; }
    }
}