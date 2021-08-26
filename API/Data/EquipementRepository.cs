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

        public async Task<EquipementDto> AddEquipement(EquipementDto equipement)
        {
            Equipement NewEquipement = new Equipement();
            _context.Equipements.Add(_mapper.Map(equipement, NewEquipement));
            await _context.SaveChangesAsync();
            return equipement;
        }

        public async Task<EquipementDto> GetEquipementById(int id)
        {
            return await _context.Equipements.Where(e => e.Id == id).ProjectTo<EquipementDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<EquipementDto>> GetEquipementsAsync()
        {
            return await _context.Equipements.ProjectTo<EquipementDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Equipement equipement)
        {
            _context.Entry(equipement).State = EntityState.Modified;
        }
    }
}