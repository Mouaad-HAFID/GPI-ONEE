using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MouvementDto
    {
        //?Props
        public int Id { get; set; }
        public string TypeMouvement { get; set; }
        public DateTime DateMouvement { get; set; } = DateTime.Now;
        //?Relations
        public int DemandeurId { get; set; }
        public ICollection<EquipementDto> Equipements { get; set; }
    }
}