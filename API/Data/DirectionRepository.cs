using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DirectionRepository : IDirectionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DirectionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<DirectionDto> AddDirection(DirectionDto direction)
        {
            Direction NewDirection = new Direction();
            _context.Direction.Add(_mapper.Map(direction, NewDirection));
            await _context.SaveChangesAsync();
            return direction;
        }

        public async Task<DirectionDto> GetDirectionByIdAsync(int id)
        {
            return await _context.Direction.Where(d => d.Id == id).ProjectTo<DirectionDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<DirectionDto>> GetDirectionsAsync()
        {
            return await _context.Direction.ProjectTo<DirectionDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Direction direction)
        {
            _context.Entry(direction).State = EntityState.Modified;
        }
        public async Task<bool> DirectionExists(string code)
        {
            return await _context.Direction.AnyAsync(Direction => Direction.CodeDirection == code.ToLower());
        }
    }
}