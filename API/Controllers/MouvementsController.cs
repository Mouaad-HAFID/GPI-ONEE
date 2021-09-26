using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class MouvementsController : BaseApiController
    {
        private readonly IMouvementRepository _mouvementRepository;

        public MouvementsController(IMouvementRepository mouvementRepository)
        {
            _mouvementRepository = mouvementRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MouvementDto>>> GetMouvements()
        {
            return Ok(await _mouvementRepository.GetMouvementsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MouvementDto>> GetMouvementById(int id)
        {
            return Ok(await _mouvementRepository.GetMouvementByIdAsync(id));
        }
        [HttpGet("last")]
        public async Task<ActionResult<MouvementDto>> GetLastMouvement()
        {
            return Ok(await _mouvementRepository.GetLastMouvement());
        }
        [HttpPost]
        public async Task<ActionResult<MouvementDto>> AddMouvement(MouvementDto mouvement)
        {
            if (await _mouvementRepository.MvtExists(mouvement.NumeroMvt)) return BadRequest("Entrée existante");
            return await _mouvementRepository.AddMouvement(mouvement);
        }
    }
}