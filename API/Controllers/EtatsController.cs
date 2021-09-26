using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class EtatsController : BaseApiController
    {
        private readonly IEtatRepository _etatRepository;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public EtatsController(IMapper mapper, IEtatRepository etatRepository, DataContext context)
        {
            _etatRepository = etatRepository;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EtatDto>>> GetEtats()
        {
            return Ok(await _etatRepository.GetAllEtatsAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<EtatDto>> GetEtatById(int id)
        {
            return Ok(await _etatRepository.GetEtatById(id));
        }
        [HttpPost]
        public async Task<ActionResult<EtatDto>> AddEtat(EtatDto Etat)
        {
            if (await _etatRepository.EtatExists(Etat.Abrev)) return BadRequest("Entrée existante");
            return Ok(await _etatRepository.AddEtat(Etat));
        }
    }
}