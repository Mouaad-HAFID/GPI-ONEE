using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IAgentRepository
    {
        void Update(Agent agent);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AgentDto>> GetAgentsAsync();
        Task<AgentDto> GetAgentByMatriculeAsync(int matricule);
        Task<AgentDto> AddAgent(AgentDto agent);
        void DeleteAgent(int matricule);
    }
}