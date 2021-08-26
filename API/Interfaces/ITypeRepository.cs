using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface ITypeRepository
    {
        void Update(TypeEquipementDto typeEquipement);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<TypeEquipementDto>> GetAllTypesAsync();
        Task<TypeEquipementDto> GetTypeById(int id);
        Task<TypeEquipementDto> AddType(TypeEquipementDto typeEquipement);
    }
}