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
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class AgentController : BaseApiController
    {
        public readonly IAgentRepository _agentRepository;
        private readonly IMapper _mapper;
        public AgentController(IAgentRepository agentRepository, IMapper mapper)
        {
            _mapper = mapper;
            _agentRepository = agentRepository;
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
            return await _agentRepository.AddAgent(agent);
        }

    }
}