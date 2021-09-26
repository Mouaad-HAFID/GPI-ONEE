using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IEquipementRepository
    {
        void Update(Equipement equipement);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<EquipementDto>> GetEquipementsAsync();
        Task<EquipementDto> GetEquipementById(int id);
        Task<EquipementDto> AddEquipement(EquipementDto equipement);
        Task<bool> EquipementExists(int serie, string serieConstructeur);
    }
}