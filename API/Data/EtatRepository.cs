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
    public class EtatRepository : IEtatRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public EtatRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<EtatDto> AddEtat(EtatDto etat)
        {
            Etat NewEtat = new Etat();
            _context.Etats.Add(_mapper.Map(etat, NewEtat));
            await _context.SaveChangesAsync();
            return etat;
        }

        public async Task<bool> EtatExists(string Abrev)
        {
            return await _context.Etats.AnyAsync(Etat => Etat.Abrev == Abrev.ToLower());
        }

        public async Task<IEnumerable<EtatDto>> GetAllEtatsAsync()
        {
            return await _context.Etats.ProjectTo<EtatDto>(_mapper.ConfigurationProvider).ToListAsync(); ;
        }

        public async Task<EtatDto> GetEtatById(int id)
        {
            return await _context.Etats.Where(c => c.Id == id).ProjectTo<EtatDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(EtatDto Etat)
        {
            _context.Entry(Etat).State = EntityState.Modified;
        }
    }
}