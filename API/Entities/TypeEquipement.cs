using System.Collections.Generic;

namespace API.Entities
{
    public class TypeEquipement
    {
        //?Props
        public int Id { get; set; }
        public string Nom { get; set; }
        //?Relations
        public ICollection<Gamme> Gammes { get; set; }
        public ICollection<Equipement> Equipement { get; set; }
        public int TypeId { get; set; }
    }
}