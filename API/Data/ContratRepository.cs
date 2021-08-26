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
    public class ContratRepository : IContratRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ContratRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ContratDto> AddContrat(ContratDto contrat)
        {
            Contrat NewContrat = new Contrat();
            _context.Contrats.Add(_mapper.Map(contrat, NewContrat));
            await _context.SaveChangesAsync();
            return contrat;
        }

        public async Task<IEnumerable<ContratDto>> GetAllContratsAsync()
        {
            return await _context.Contrats.ProjectTo<ContratDto>(_mapper.ConfigurationProvider).ToListAsync(); ;
        }

        public async Task<ContratDto> GetContratById(int id)
        {
            return await _context.Contrats.Where(c => c.Id == id).ProjectTo<ContratDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(ContratDto contrat)
        {
            _context.Entry(contrat).State = EntityState.Modified;
        }
    }
}