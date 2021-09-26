using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IEtatRepository
    {
        void Update(EtatDto etat);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<EtatDto>> GetAllEtatsAsync();
        Task<EtatDto> GetEtatById(int id);
        Task<EtatDto> AddEtat(EtatDto etat);
        Task<bool> EtatExists(string code);
    }
}