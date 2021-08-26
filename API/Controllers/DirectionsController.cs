using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class DirectionsController : BaseApiController
    {
        private readonly IDirectionRepository _directionRepository;
        private readonly DataContext _context;

        public DirectionsController(IDirectionRepository directionRepository, DataContext context)
        {
            _directionRepository = directionRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DirectionDto>>> GetDirections()
        {
            var directions = await _directionRepository.GetDirectionsAsync();
            return Ok(directions);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<DirectionDto>> GetDirectionById(int id)
        {
            return Ok(await _directionRepository.GetDirectionByIdAsync(id));
        }
        [HttpPost]
        public async Task<ActionResult<DirectionDto>> AddDirection(DirectionDto direction)
        {
            if (await DirectionExists(direction.Id)) return BadRequest("Direction Existante.");
            return await _directionRepository.AddDirection(direction);
        }

        private async Task<bool> DirectionExists(int id)
        {
            return await _context.Direction.AnyAsync(Direction => Direction.Id == id);
        }
    }
}