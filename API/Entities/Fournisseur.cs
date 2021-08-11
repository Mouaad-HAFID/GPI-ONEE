using System.Collections.Generic;

namespace API.Entities
{
    public class Fournisseur
    {
        public int Id { get; set; }
        public ICollection<Equipement> Equipements { get; set; }

    }
}