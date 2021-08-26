using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IDirectionRepository
    {
        Task<IEnumerable<DirectionDto>> GetDirectionsAsync();
        Task<DirectionDto> GetDirectionByIdAsync(int id);
        Task<DirectionDto> AddDirection(DirectionDto direction);
        void Update(Direction direction);
        Task<bool> SaveAllAsync();
    }
}