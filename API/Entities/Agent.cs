using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Agents")]
    public class Agent
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
        public ICollection<Equipement> Equipements { get; set; }
        public Direction Direction { get; set; }
        public int DirectionId { get; set; }
        public ICollection<Mouvement> Mouvements { get; set; }
    }
}