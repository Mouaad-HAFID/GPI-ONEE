using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IFournisseurRepository
    {
        void Update(FournisseurDto fournisseur);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<FournisseurDto>> GetAllFournisseursAsync();
        Task<FournisseurDto> GetFournisseurById(int id);
        Task<FournisseurDto> AddFournisseur(FournisseurDto fournisseur);
        Task<bool> FournisseurExists(string code);

    }
}