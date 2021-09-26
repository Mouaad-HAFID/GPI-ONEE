using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class GammesController : BaseApiController
    {
        private readonly IGammeRepository _gammeRepository;

        public GammesController(IGammeRepository gammeRepository)
        {
            _gammeRepository = gammeRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GammeDto>>> GetGammes()
        {
            return Ok(await _gammeRepository.GetAllGammesAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GammeDto>> GetGammeById(int id)
        {
            return Ok(await _gammeRepository.GetGammeById(id));
        }
        [HttpPost]
        public async Task<ActionResult<GammeDto>> AddGamme(GammeDto Gamme)
        {
            if (await _gammeRepository.GammeExists(Gamme.Code)) return BadRequest("Entrée existante");
            return Ok(await _gammeRepository.AddGamme(Gamme));
        }
    }
}