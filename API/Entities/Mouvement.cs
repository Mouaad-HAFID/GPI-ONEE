using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Mouvements")]
    public class Mouvement
    {
        //?Props
        public int Id { get; set; }
        public string TypeMouvement { get; set; }
        public DateTime DateMouvement { get; set; } = DateTime.Now;
        //?Relations
        public Agent Demandeur { get; set; }
        public int DemandeurId { get; set; }
        public ICollection<Equipement> Equipements { get; set; }


    }
}