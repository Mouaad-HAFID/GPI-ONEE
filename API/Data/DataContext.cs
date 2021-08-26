using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Equipement> Equipements { get; set; }
        public DbSet<Direction> Direction { get; set; }
        public DbSet<Inventaire> Inventaire { get; set; }
        public DbSet<Mouvement> Mouvement { get; set; }
        public DbSet<Fournisseur> Fournisseur { get; set; }
        public DbSet<Gamme> Gammes { get; set; }
        public DbSet<TypeEquipement> TypeEquipement { get; set; }
        public DbSet<Contrat> Contrats { get; set; }
    }
}