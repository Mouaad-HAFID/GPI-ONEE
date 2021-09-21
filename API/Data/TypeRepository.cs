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
    public class TypeRepository : ITypeRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public TypeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<TypeEquipementDto> AddType(TypeEquipementDto typeEquipement)
        {
            TypeEquipement NewType = new TypeEquipement();
            var t = _mapper.Map(typeEquipement, NewType);
            _context.TypeEquipement.Add(t);
            await _context.SaveChangesAsync();
            typeEquipement.Id = t.Id;
            return typeEquipement;
        }

        public async Task<IEnumerable<TypeEquipementDto>> GetAllTypesAsync()
        {
            return await _context.TypeEquipement.ProjectTo<TypeEquipementDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<TypeEquipementDto> GetTypeById(int id)
        {
            return await _context.TypeEquipement.Where(t => t.Id == id).ProjectTo<TypeEquipementDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(TypeEquipementDto typeEquipement)
        {
            _context.Entry(typeEquipement).State = EntityState.Modified;
        }
    }
}