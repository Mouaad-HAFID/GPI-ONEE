using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ContratsController : BaseApiController
    {
        private readonly IContratRepository _contratRepository;

        public ContratsController(IContratRepository conratRepository)
        {
            _contratRepository = conratRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContratDto>>> GetContrats()
        {
            return Ok(await _contratRepository.GetAllContratsAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ContratDto>> GetContratById(int id)
        {
            return Ok(await _contratRepository.GetContratById(id));
        }
        [HttpPost]
        public async Task<ActionResult<ContratDto>> AddContrat(ContratDto Contrat)
        {
            if (await _contratRepository.ContratExists(Contrat.NumeroContrat))
                return BadRequest("Entrée existante");
            return Ok(await _contratRepository.AddContrat(Contrat));
        }
    }
}