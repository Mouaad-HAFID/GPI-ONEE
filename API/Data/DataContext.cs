using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Equipement_Mouvement>()
            .HasOne(e => e.Equipement)
            .WithMany(me => me.Equipement_Mouvements)
            .HasForeignKey(ei => ei.EquipementId);

            modelBuilder.Entity<Equipement_Mouvement>()
            .HasOne(e => e.Mouvement)
            .WithMany(me => me.Equipement_Mouvements)
            .HasForeignKey(ei => ei.MouvementId);
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Equipement> Equipements { get; set; }
        public DbSet<Direction> Direction { get; set; }
        public DbSet<Inventaire> Inventaire { get; set; }
        public DbSet<Mouvement> Mouvement { get; set; }
        public DbSet<Equipement_Mouvement> Equipements_Mouvements { get; set; }

        public DbSet<Fournisseur> Fournisseur { get; set; }
        public DbSet<Gamme> Gammes { get; set; }
        public DbSet<TypeEquipement> TypeEquipement { get; set; }
        public DbSet<Contrat> Contrats { get; set; }
        public DbSet<Etat> Etats { get; set; }
    }
}