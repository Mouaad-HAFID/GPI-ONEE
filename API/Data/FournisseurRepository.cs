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
    public class FournisseurRepository : IFournisseurRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public FournisseurRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<FournisseurDto> AddFournisseur(FournisseurDto fournisseur)
        {
            Fournisseur NewFournisseur = new Fournisseur();
            _context.Fournisseur.Add(_mapper.Map(fournisseur, NewFournisseur));
            await _context.SaveChangesAsync();
            return fournisseur;
        }

        public async Task<bool> FournisseurExists(string code)
        {
            return await _context.Fournisseur.AnyAsync(Fournisseur => Fournisseur.CodeFournisseur == code.ToLower());
        }

        public async Task<IEnumerable<FournisseurDto>> GetAllFournisseursAsync()
        {
            return await _context.Fournisseur.ProjectTo<FournisseurDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<FournisseurDto> GetFournisseurById(int id)
        {
            return await _context.Fournisseur.Where(f => f.Id == id).ProjectTo<FournisseurDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(FournisseurDto fournisseur)
        {
            _context.Entry(fournisseur).State = EntityState.Modified;
        }
    }
}