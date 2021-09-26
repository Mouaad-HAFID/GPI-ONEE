using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Agent, AgentDto>().ReverseMap();
            CreateMap<Direction, DirectionDto>().ReverseMap();
            CreateMap<Equipement, EquipementDto>().ReverseMap();
            CreateMap<Inventaire, InventaireDto>().ReverseMap();
            CreateMap<Fournisseur, FournisseurDto>().ReverseMap();
            CreateMap<Mouvement, MouvementDto>().ReverseMap();
            CreateMap<Contrat, ContratDto>().ReverseMap();
            CreateMap<Gamme, GammeDto>().ReverseMap();
            CreateMap<TypeEquipement, TypeEquipementDto>().ReverseMap();
            CreateMap<AffectationDto, Equipement>().ReverseMap();
        }
    }
}