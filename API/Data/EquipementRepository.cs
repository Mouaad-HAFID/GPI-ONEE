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
    public class EquipementRepository : IEquipementRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EquipementRepository(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public Task<EquipementDto> AddEquipement(EquipementDto equipement)
        {
            throw new System.NotImplementedException();
        }

        public async Task<EquipementDto> GetEquipementById(int id)
        {
            return await _context.Equipements.Where(e => e.Id == id).ProjectTo<EquipementDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public Task<IEnumerable<EquipementDto>> GetEquipementsAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(Equipement equipement)
        {
            throw new System.NotImplementedException();
        }
    }
}