using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IInventaireRepository
    {
        void Update(Inventaire inventaire);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<InventaireDto>> GetInventairesAsync();
        Task<InventaireDto> GetInventaireByIdAsync(int id);
        Task<InventaireDto> AddInventaire(InventaireDto inventaire);
    }
}