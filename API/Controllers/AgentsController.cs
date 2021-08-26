using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class AgentsController : BaseApiController
    {
        public readonly IAgentRepository _agentRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AgentsController(DataContext context, IAgentRepository agentRepository, IMapper mapper)
        {
            _mapper = mapper;
            _agentRepository = agentRepository;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgentDto>>> GetAgents()
        {
            var agents = await _agentRepository.GetAgentsAsync();
            return Ok(agents);
        }
        [HttpGet("{matricule}")]
        public async Task<ActionResult<AgentDto>> GetAgentByMatricule(int matricule)
        {

            return await _agentRepository.GetAgentByMatriculeAsync(matricule);
        }
        [HttpPost]
        public async Task<ActionResult<AgentDto>> AddAgent(AgentDto agent)
        {
            if (await AgentExists(agent.Matricule)) return BadRequest("Agent Existant.");
            return await _agentRepository.AddAgent(agent);
        }

        [HttpDelete("{matricule}")]
        public async Task<ActionResult> DeleteAgent(int matricule)
        {
            if (!await AgentExists(matricule)) return BadRequest("Agent Introuvable.");
            _context.Agents.Remove(await _context.Agents.Where(a => a.Matricule == matricule).SingleOrDefaultAsync());
            await _context.SaveChangesAsync();
            return NoContent();

        }

        private async Task<bool> AgentExists(int Matricule)
        {
            return await _context.Agents.AnyAsync(User => User.Matricule == Matricule);
        }
    }
}