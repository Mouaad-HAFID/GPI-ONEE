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
    public class MouvementRepository : IMouvementRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public MouvementRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MouvementDto> AddMouvement(MouvementDto mouvement)
        {
            Mouvement NewMouvement = new Mouvement();
            _context.Mouvement.Add(_mapper.Map(mouvement, NewMouvement));
            await _context.SaveChangesAsync();
            return mouvement;
        }

        public async Task<MouvementDto> GetMouvementByIdAsync(int id)
        {
            return await _context.Mouvement.Where(m => m.Id == id).ProjectTo<MouvementDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MouvementDto>> GetMouvementsAsync()
        {
            return await _context.Mouvement.ProjectTo<MouvementDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(MouvementDto mouvement)
        {
            _context.Entry(mouvement).State = EntityState.Modified;
        }
    }
}