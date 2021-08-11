using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Agent, AgentDto>();
            CreateMap<Direction, DirectionDto>();
            CreateMap<Equipement, EquipementDto>();
            CreateMap<Inventaire, InventaireDto>();
            CreateMap<Fournisseur, FournisseurDto>();
            CreateMap<Mouvement, MouvementDto>();
            CreateMap<Contrat, ContratDto>();
            CreateMap<Gamme, GammeDto>();
            CreateMap<TypeEquipement, TypeEquipementDto>();

        }
    }
}