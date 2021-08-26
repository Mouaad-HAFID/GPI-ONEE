using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class FournisseursController : BaseApiController
    {
        private readonly IFournisseurRepository _fournisseurRepository;

        public FournisseursController(IFournisseurRepository fournisseurRepository)
        {
            _fournisseurRepository = fournisseurRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FournisseurDto>>> GetFournisseurs()
        {
            return Ok(await _fournisseurRepository.GetAllFournisseursAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<FournisseurDto>> GetFournisseurById(int id)
        {
            return Ok(await _fournisseurRepository.GetFournisseurById(id));
        }
        [HttpPost]
        public async Task<ActionResult<FournisseurDto>> AddFournisseur(FournisseurDto fournisseur)
        {
            return Ok(await _fournisseurRepository.AddFournisseur(fournisseur));
        }
    }
}