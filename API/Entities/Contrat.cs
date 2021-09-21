using System;

namespace API.Entities
{
    public class Contrat
    {
        public int Id { get; set; }
        public int NumeroContrat { get; set; }
        public DateTime Date1 { get; set; } = DateTime.Now;
        public DateTime Date2 { get; set; } = DateTime.Now;
        public DateTime Date3 { get; set; } = DateTime.Now;

        public Fournisseur Fournisseur { get; set; }
        public int FournisseurId { get; set; }


    }
}