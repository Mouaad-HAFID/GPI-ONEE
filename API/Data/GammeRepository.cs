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
    public class GammeRepository : IGammeRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public GammeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<GammeDto> AddGamme(GammeDto gamme)
        {
            Gamme NewGamme = new Gamme();
            var g = _mapper.Map(gamme, NewGamme);
            _context.Gammes.Add(_mapper.Map(gamme, NewGamme));
            await _context.SaveChangesAsync();
            gamme.Id = g.Id;
            return gamme;
        }

        public async Task<bool> GammeExists(string code)
        {
            return await _context.Gammes.AnyAsync(Gamme => Gamme.Code == code.ToLower());
        }

        public async Task<IEnumerable<GammeDto>> GetAllGammesAsync()
        {
            return await _context.Gammes.ProjectTo<GammeDto>(_mapper.ConfigurationProvider).ToListAsync(); ;
        }

        public async Task<GammeDto> GetGammeById(int id)
        {
            return await _context.Gammes.Where(c => c.Id == id).ProjectTo<GammeDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(GammeDto gamme)
        {
            _context.Entry(gamme).State = EntityState.Modified;
        }
    }
}