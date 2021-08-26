using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EquipementsController : BaseApiController
    {
        private readonly IEquipementRepository _equipementRepository;
        public EquipementsController(IEquipementRepository equipementRepository)
        {
            _equipementRepository = equipementRepository;
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
            return await _equipementRepository.AddEquipement(equipement);
        }
    }
}