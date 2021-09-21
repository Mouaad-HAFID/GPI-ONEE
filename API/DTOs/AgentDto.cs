using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class AgentDto
    {
        //?Props
        public int Id { get; set; }
        public int Matricule { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string DR { get; set; }
        public string Dir { get; set; }
        public string DomainePerso { get; set; }
        public string Poste { get; set; }
        public string Fonction { get; set; }
        public string UniteStruc { get; set; }
        //?Relations
        public ICollection<EquipementDto> Equipements { get; set; }
        public ICollection<MouvementDto> Mouvements { get; set; }
    }
}