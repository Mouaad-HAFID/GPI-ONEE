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
    public class InventaireRepository : IInventaireRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public InventaireRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<InventaireDto> AddInventaire(InventaireDto inventaire)
        {
            Inventaire NewInventaire = new Inventaire();
            _context.Inventaire.Add(_mapper.Map(inventaire, NewInventaire));
            await _context.SaveChangesAsync();
            return inventaire;
        }

        public async Task<IEnumerable<InventaireDto>> GetInventairesAsync()
        {
            return await _context.Inventaire.ProjectTo<InventaireDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public Task<InventaireDto> GetInventaireByIdAsync(int id)
        {
            return _context.Inventaire.Where(i => i.Id == id).ProjectTo<InventaireDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Inventaire inventaire)
        {
            _context.Entry(inventaire).State = EntityState.Modified;
        }
    }
}