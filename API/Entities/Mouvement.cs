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
        public int NumeroMvt { get; set; }
        public string TypeMouvement { get; set; }
        public DateTime DateMouvement { get; set; } = DateTime.Now;
        public DateTime? DateFinMouvement { get; set; } = DateTime.Now;
        public string ListeEquipements { get; set; }
        //?Relations
        public Agent Demandeur { get; set; }
        public int? DemandeurId { get; set; } = null;
        public ICollection<Equipement> Equipements { get; set; }


    }
}