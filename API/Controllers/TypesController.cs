using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class TypesController : BaseApiController
    {
        private readonly ITypeRepository _typeRepository;

        public TypesController(ITypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeEquipementDto>>> GetTypes()
        {
            return Ok(await _typeRepository.GetAllTypesAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeEquipementDto>> GetTypeById(int id)
        {
            return Ok(await _typeRepository.GetTypeById(id));
        }
        [HttpPost]
        public async Task<ActionResult<TypeEquipementDto>> AddType(TypeEquipementDto Type)
        {
            return Ok(await _typeRepository.AddType(Type));
        }
    }
}