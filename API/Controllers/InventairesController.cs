using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class InventairesController : BaseApiController
    {
        private readonly IInventaireRepository _inventaireRepository;
        private readonly DataContext _context;

        public InventairesController(IInventaireRepository inventaireRepository, DataContext context)
        {
            _inventaireRepository = inventaireRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventaireDto>>> GetAllInventaires()
        {
            var inventaires = await _inventaireRepository.GetInventairesAsync();
            return Ok(inventaires);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<InventaireDto>> GetInventaireById(int id)
        {
            var inventaire = await _inventaireRepository.GetInventaireByIdAsync(id);
            return Ok(inventaire);
        }
        [HttpPost]
        public async Task<ActionResult<InventaireDto>> AddInventaire(InventaireDto inventaire)
        {
            return await _inventaireRepository.AddInventaire(inventaire);
        }

    }
}