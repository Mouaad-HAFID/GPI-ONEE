using System.Collections.Generic;

namespace API.Entities
{
    public class Direction
    {
        //?Props
        public int Id { get; set; }
        public string CodeDirection { get; set; }

        //?Relations
        public Inventaire Inventaire { get; set; }
        public Mouvement Mouvement { get; set; }
    }
}