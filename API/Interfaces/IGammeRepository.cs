using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IGammeRepository
    {
        void Update(GammeDto gamme);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<GammeDto>> GetAllGammesAsync();
        Task<GammeDto> GetGammeById(int id);
        Task<GammeDto> AddGamme(GammeDto gamme);
        Task<bool> GammeExists(string code);
    }
}