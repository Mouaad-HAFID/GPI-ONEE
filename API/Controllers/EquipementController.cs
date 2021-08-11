using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EquipementController : BaseApiController
    {
        private readonly IEquipementRepository _equipementRepository;
        public EquipementController(IEquipementRepository equipementRepository)
        {
            _equipementRepository = equipementRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EquipementDto>> GetEquipemntById(int id)
        {
            return await _equipementRepository.GetEquipementById(id);
        }
    }
}