using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IContratRepository
    {
        void Update(ContratDto contrat);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<ContratDto>> GetAllContratsAsync();
        Task<ContratDto> GetContratById(int id);
        Task<ContratDto> AddContrat(ContratDto Contrat);
    }
}