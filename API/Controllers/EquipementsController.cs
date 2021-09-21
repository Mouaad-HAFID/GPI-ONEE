using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EquipementsController : BaseApiController
    {
        private readonly IEquipementRepository _equipementRepository;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public EquipementsController(IEquipementRepository equipementRepository, DataContext context, IMapper mapper)
        {
            _equipementRepository = equipementRepository;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EquipementDto>> GetEquipemntById(int id)
        {
            return Ok(await _equipementRepository.GetEquipementById(id));
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipementDto>>> GetEquipements()
        {
            return Ok(await _equipementRepository.GetEquipementsAsync());
        }
        [HttpPost]
        public async Task<ActionResult<EquipementDto>> AddEquipement(EquipementDto equipement)
        {
            if (await _equipementRepository.EquipementExists(equipement.Serie)) return BadRequest("Entrée existante");
            return await _equipementRepository.AddEquipement(equipement);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AffectEquipement(int id, AffectationDto affectationDto)
        {
            var equip = await _context.Equipements.Where(e => e.Id == id).SingleOrDefaultAsync();
            _mapper.Map(affectationDto, equip);
            _equipementRepository.Update(equip);
            if (await _equipementRepository.SaveAllAsync()) return NoContent();
            return BadRequest();

        }
    }
}