using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IMouvementRepository
    {
        void Update(MouvementDto mouvement);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<MouvementDto>> GetMouvementsAsync();
        Task<MouvementDto> GetMouvementByIdAsync(int id);
        Task<MouvementDto> AddMouvement(MouvementDto mouvement);
    }
}