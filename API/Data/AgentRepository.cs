using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AgentRepository : IAgentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AgentRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<AgentDto> GetAgentByMatriculeAsync(int matricule)
        {
            return await _context.Agents.Where(a => a.Matricule == matricule).ProjectTo<AgentDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
            // var agentToReturn = _mapper.Map<AgentDto>(agent);
            // agentToReturn.Direction = _mapper.Map<DirectionDto>(agent.Direction);
        }

        public async Task<IEnumerable<AgentDto>> GetAgentsAsync()
        {
            return await _context.Agents.ProjectTo<AgentDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<AgentDto> AddAgent(AgentDto agent)
        {
            var NewAgent = new Agent
            {
                Matricule = agent.Matricule,
                Nom = agent.Nom,
                Prenom = agent.Prenom,
                DirectionId = agent.DirectionId
            };
            _context.Agents.Add(NewAgent);
            await _context.SaveChangesAsync();
            return agent;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Agent agent)
        {
            _context.Entry(agent).State = EntityState.Modified;
        }


    }
}