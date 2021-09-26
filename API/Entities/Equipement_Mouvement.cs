using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Equipement_Mouvement
    {
        public int Id { get; set; }
        public int MouvementId { get; set; }
        public Mouvement Mouvement { get; set; }
        public int EquipementId { get; set; }
        public Equipement Equipement { get; set; }

    }
}