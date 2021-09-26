using System.Collections.Generic;

namespace API.Entities
{
    public class Etat
    {
        public int Id { get; set; }
        public string Abrev { get; set; }
        public string Designation { get; set; }
        public ICollection<Equipement> Equipements { get; set; }
    }
}