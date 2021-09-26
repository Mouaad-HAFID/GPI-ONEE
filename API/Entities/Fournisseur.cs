using System.Collections.Generic;

namespace API.Entities
{
    public class Fournisseur
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string CodeFournisseur { get; set; }
        public ICollection<Equipement> Equipements { get; set; }
        public ICollection<Contrat> Contrats { get; set; }

    }
}