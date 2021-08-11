using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Gammes")]
    public class Gamme
    {
        //?Props
        public int Id { get; set; }
        public string Caracteristiques { get; set; }
        //?Relations
        public TypeEquipement Type { get; set; }
        public int TypeId { get; set; }
        public ICollection<Equipement> Equipements { get; set; }
    }
}