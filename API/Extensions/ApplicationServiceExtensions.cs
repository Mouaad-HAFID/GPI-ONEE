using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAgentRepository, AgentRepository>();
            services.AddScoped<IEquipementRepository, EquipementRepository>();
            services.AddScoped<IDirectionRepository, DirectionRepository>();
            services.AddScoped<IInventaireRepository, InventaireRepository>();
            services.AddScoped<IMouvementRepository, MouvementRepository>();
            services.AddScoped<IFournisseurRepository, FournisseurRepository>();
            services.AddScoped<IContratRepository, ContratRepository>();
            services.AddScoped<IGammeRepository, GammeRepository>();
            services.AddScoped<ITypeRepository, TypeRepository>();
            services.AddScoped<IEtatRepository, EtatRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(optionsAction =>
            {
                optionsAction.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
}