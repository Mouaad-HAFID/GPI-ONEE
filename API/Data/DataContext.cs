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
    }
}